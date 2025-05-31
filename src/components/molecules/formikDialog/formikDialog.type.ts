export type FormikDialogProps = {
  onClose: () => void;
  openFormikDialog: boolean;
  selectedUser?: SelectedUserProps;
};

export type SelectedUserProps = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
};
