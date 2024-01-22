export type FileDropRenderModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (image: HTMLImageElement) => Promise<void>;
  initialImage: string;
  children: React.ReactNode;
  value?: string;
};
