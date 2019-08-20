import { QuickAssign } from './quickassign.model';
import { BUTTON_TYPE } from './../constants/button-type.constants';

/**
    This class is sent to different components either in a list or in it self
 */
export class ActionItem extends QuickAssign {
    label: string; // What should be shown to the user
    action?: string; // An identifier for this action
    disabled?: boolean; // Enables or disables an action item
}