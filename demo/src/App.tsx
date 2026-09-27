import { useReducer } from 'react';
import type { ReactNode } from 'react';

import BreakingNews from './components/BreakingNews';
import ChaosEditor from './components/ChaosEditor';
import EvidenceLocked from './components/EvidenceLocked';
import Landing from './components/Landing';
import PoliceEvidence from './components/PoliceEvidence';
import PublishingSequence from './components/PublishingSequence';
import ChaosReport from './components/ChaosReport';
import ReportGeneration from './components/ReportGeneration';
import ScenarioSelect from './components/ScenarioSelect';
import SocialReaction from './components/SocialReaction';
import UploadEvidence from './components/UploadEvidence';
import { reactions } from './data/reactions';
import { scenarios } from './data/scenarios';
import type {
  EvidenceMetadata,
  ExperiencePhase,
  ReactionStage,
  ReportStage,
  Scenario,
} from './types/app';

interface ExperienceState {
  phase: ExperiencePhase;
  reactionStage: ReactionStage | null;
  reportStage: ReportStage | null;
  reportGeneratedAt: string | null;
  caseId: string;
  selectedScenario: Scenario | null;
  sourceImageDataUrl: string | null;
  sourceImageMetadata: EvidenceMetadata | null;
  editedImageDataUrl: string | null;
  editedImageBlob: Blob | null;
}

type ExperienceAction =
  | { type: 'ENTER_LEONIDA' }
  | { type: 'SELECT_SCENARIO'; scenario: Scenario }
  | { type: 'OPEN_UPLOAD' }
  | { type: 'SET_SOURCE_IMAGE'; dataUrl: string; metadata: EvidenceMetadata }
  | { type: 'CLEAR_SOURCE_IMAGE' }
  | { type: 'OPEN_EDITOR' }
  | { type: 'CANCEL_EDITOR' }
  | { type: 'SAVE_EDITED_IMAGE'; dataUrl: string; blob: Blob }
  | { type: 'EDIT_AGAIN' }
  | { type: 'RETURN_TO_SCENARIOS' }
  | { type: 'START_PUBLISHING' }
  | { type: 'SET_REACTION_STAGE'; stage: ReactionStage }
  | { type: 'OPEN_REPORT'; generatedAt: string }
  | { type: 'FINISH_REPORT' }
  | { type: 'RETURN_TO_POLICE' }
  | { type: 'NEW_CHAOS' };

const createCaseId = () =>
  `LL-09${new Date().getDate().toString().padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;
const createInitialState = (): ExperienceState => ({
  phase: 'landing',
  reactionStage: null,
  reportStage: null,
  reportGeneratedAt: null,
  caseId: createCaseId(),
  selectedScenario: null,
  sourceImageDataUrl: null,
  sourceImageMetadata: null,
  editedImageDataUrl: null,
  editedImageBlob: null,
});

function experienceReducer(
  state: ExperienceState,
  action: ExperienceAction
): ExperienceState {
  switch (action.type) {
    case 'ENTER_LEONIDA':
      return { ...state, phase: 'scenario' };
    case 'SELECT_SCENARIO':
      return {
        ...state,
        selectedScenario: action.scenario,
        reactionStage: null,
        reportStage: null,
        reportGeneratedAt: null,
        sourceImageDataUrl: null,
        sourceImageMetadata: null,
        editedImageDataUrl: null,
        editedImageBlob: null,
      };
    case 'OPEN_UPLOAD':
      return state.selectedScenario ? { ...state, phase: 'upload' } : state;
    case 'SET_SOURCE_IMAGE':
      return {
        ...state,
        sourceImageDataUrl: action.dataUrl,
        sourceImageMetadata: action.metadata,
        editedImageDataUrl: null,
        editedImageBlob: null,
        reactionStage: null,
        reportStage: null,
        reportGeneratedAt: null,
      };
    case 'CLEAR_SOURCE_IMAGE':
      return {
        ...state,
        sourceImageDataUrl: null,
        sourceImageMetadata: null,
        editedImageDataUrl: null,
        editedImageBlob: null,
        reactionStage: null,
        reportStage: null,
        reportGeneratedAt: null,
      };
    case 'OPEN_EDITOR':
      return state.sourceImageDataUrl ? { ...state, phase: 'edit' } : state;
    case 'CANCEL_EDITOR':
      return { ...state, phase: 'upload' };
    case 'SAVE_EDITED_IMAGE':
      return {
        ...state,
        phase: 'locked',
        editedImageDataUrl: action.dataUrl,
        editedImageBlob: action.blob,
        reactionStage: null,
        reportStage: null,
        reportGeneratedAt: null,
      };
    case 'EDIT_AGAIN':
      return state.editedImageDataUrl
        ? {
            ...state,
            phase: 'edit',
            sourceImageDataUrl: state.editedImageDataUrl,
            reactionStage: null,
            reportStage: null,
            reportGeneratedAt: null,
          }
        : state;
    case 'RETURN_TO_SCENARIOS':
      return { ...state, phase: 'scenario' };
    case 'START_PUBLISHING':
      return state.editedImageDataUrl
        ? { ...state, phase: 'reactions', reactionStage: 'publishing' }
        : state;
    case 'SET_REACTION_STAGE':
      return { ...state, phase: 'reactions', reactionStage: action.stage };
    case 'OPEN_REPORT':
      return {
        ...state,
        phase: 'report',
        reportStage: 'generating',
        reportGeneratedAt: action.generatedAt,
      };
    case 'FINISH_REPORT':
      return { ...state, reportStage: 'ready' };
    case 'RETURN_TO_POLICE':
      return { ...state, phase: 'reactions', reactionStage: 'police' };
    case 'NEW_CHAOS':
      return { ...createInitialState(), phase: 'scenario' };
  }
}

export default function App() {
  const [state, dispatch] = useReducer(
    experienceReducer,
    undefined,
    createInitialState
  );
  const scenarioScreen = (
    <ScenarioSelect
      scenarios={scenarios}
      selectedScenarioId={state.selectedScenario?.id ?? null}
      onSelect={(scenario) => dispatch({ type: 'SELECT_SCENARIO', scenario })}
      onContinue={() => dispatch({ type: 'OPEN_UPLOAD' })}
    />
  );
  const uploadScreen = state.selectedScenario ? (
    <UploadEvidence
      scenario={state.selectedScenario}
      sourceImageDataUrl={state.sourceImageDataUrl}
      sourceImageMetadata={state.sourceImageMetadata}
      onEvidenceReady={(dataUrl, metadata) =>
        dispatch({ type: 'SET_SOURCE_IMAGE', dataUrl, metadata })
      }
      onChooseAnother={() => dispatch({ type: 'CLEAR_SOURCE_IMAGE' })}
      onEdit={() => dispatch({ type: 'OPEN_EDITOR' })}
      onBack={() => dispatch({ type: 'RETURN_TO_SCENARIOS' })}
    />
  ) : (
    scenarioScreen
  );
  const reaction = state.selectedScenario
    ? reactions[state.selectedScenario.id]
    : null;

  let content: ReactNode;
  switch (state.phase) {
    case 'landing':
      content = <Landing onEnter={() => dispatch({ type: 'ENTER_LEONIDA' })} />;
      break;
    case 'scenario':
      content = scenarioScreen;
      break;
    case 'upload':
      content = uploadScreen;
      break;
    case 'edit':
      content =
        state.selectedScenario && state.sourceImageDataUrl ? (
          <ChaosEditor
            caseId={state.caseId}
            scenario={state.selectedScenario}
            image={state.sourceImageDataUrl}
            onSave={({ dataUrl, blob }) =>
              dispatch({ type: 'SAVE_EDITED_IMAGE', dataUrl, blob })
            }
            onCancel={() => dispatch({ type: 'CANCEL_EDITOR' })}
          />
        ) : (
          uploadScreen
        );
      break;
    case 'locked':
      content =
        state.selectedScenario && state.editedImageDataUrl ? (
          <EvidenceLocked
            caseId={state.caseId}
            scenario={state.selectedScenario}
            image={state.editedImageDataUrl}
            sourceMetadata={state.sourceImageMetadata}
            onEditAgain={() => dispatch({ type: 'EDIT_AGAIN' })}
            onNewImage={() => {
              dispatch({ type: 'CLEAR_SOURCE_IMAGE' });
              dispatch({ type: 'OPEN_UPLOAD' });
            }}
            onBack={() => dispatch({ type: 'RETURN_TO_SCENARIOS' })}
            onPublish={() => dispatch({ type: 'START_PUBLISHING' })}
          />
        ) : (
          uploadScreen
        );
      break;
    case 'reactions':
      if (!state.selectedScenario || !state.editedImageDataUrl || !reaction) {
        content = uploadScreen;
        break;
      }
      switch (state.reactionStage) {
        case 'publishing':
          content = (
            <PublishingSequence
              onComplete={() =>
                dispatch({ type: 'SET_REACTION_STAGE', stage: 'social' })
              }
            />
          );
          break;
        case 'social':
          content = (
            <SocialReaction
              reaction={reaction}
              image={state.editedImageDataUrl}
              onNext={() =>
                dispatch({ type: 'SET_REACTION_STAGE', stage: 'news' })
              }
            />
          );
          break;
        case 'news':
          content = (
            <BreakingNews
              scenario={state.selectedScenario}
              reaction={reaction}
              image={state.editedImageDataUrl}
              onNext={() =>
                dispatch({ type: 'SET_REACTION_STAGE', stage: 'police' })
              }
            />
          );
          break;
        case 'police':
          content = (
            <PoliceEvidence
              caseId={state.caseId}
              scenario={state.selectedScenario}
              reaction={reaction}
              image={state.editedImageDataUrl}
              onReport={() =>
                dispatch({
                  type: 'OPEN_REPORT',
                  generatedAt: new Date().toLocaleString(),
                })
              }
            />
          );
          break;
        default:
          content = uploadScreen;
      }
      break;
    case 'report':
      if (!state.selectedScenario || !state.editedImageDataUrl || !reaction) {
        content = uploadScreen;
      } else if (state.reportStage === 'generating') {
        content = (
          <ReportGeneration
            onComplete={() => dispatch({ type: 'FINISH_REPORT' })}
          />
        );
      } else {
        content = (
          <ChaosReport
            caseId={state.caseId}
            scenario={state.selectedScenario}
            reaction={reaction}
            image={state.editedImageDataUrl}
            blob={state.editedImageBlob}
            generatedAt={state.reportGeneratedAt ?? 'Incident archive'}
            onEditAgain={() => dispatch({ type: 'EDIT_AGAIN' })}
            onNewChaos={() => dispatch({ type: 'NEW_CHAOS' })}
            onBackToIncident={() => dispatch({ type: 'RETURN_TO_POLICE' })}
          />
        );
      }
      break;
  }

  return (
    <div className="experience-shell">
      <div className="atmosphere" aria-hidden="true">
        <span className="atmosphere__sun" />
        <span className="atmosphere__orb atmosphere__orb--coral" />
        <span className="atmosphere__orb atmosphere__orb--aqua" />
        <span className="atmosphere__grid" />
        <span className="atmosphere__scanlines" />
        <span className="atmosphere__grain" />
      </div>
      <main className="experience-main">{content}</main>
    </div>
  );
}
