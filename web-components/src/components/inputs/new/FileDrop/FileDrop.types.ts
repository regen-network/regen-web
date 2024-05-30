export type FileDropRenderModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (image: HTMLImageElement) => Promise<void>;
  initialFile: string;
  value?: string;
  currentIndex: number;
};
