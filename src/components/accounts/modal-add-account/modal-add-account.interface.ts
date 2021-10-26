import { Status } from 'components/util/status';

export interface ModalAddAccountProps {
  type?: 'create-account' | 'import-account';
}

export interface ModalAddAccountStateInterface {
  status: Status;
  title: string;
  url: string;
  show: boolean;
  error: {
    url?: string;
    title?: string;
  };
}

export enum ModalAddAccountErrors {
  missingUrl = 'Please add a google sheets url',
  missingTitle = 'A title is required to create a new google sheet',
  invalidUrl = 'The URL is invalid. Please check if you have access to this google sheets',
}
