export type FileDropRenderModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (image: HTMLImageElement) => Promise<void>;
  initialImage: string;
  value?: string;
  currentIndex: number;
};
