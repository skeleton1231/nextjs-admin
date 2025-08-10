export type BatchActionConfirm = {
  title?: string;
  content?: string;
  confirmText?: string;
};

export type BatchAction<TId extends string | number> = {
  key: string;
  label: string;
  onAction: (ids: TId[]) => Promise<void> | void;
  confirm?: BatchActionConfirm;
  disabled?: boolean;
};
