declare class NCLI {
  constructor(options: {
    titleColor?: string;
    subtitleColor?: string;
    msgColor?: string;
    optionsColor?: string;
    inputCharColor?: string;
  });
  #imageProcess(imageObj: { path: string; process: boolean }): Promise<void>;
  #showTitle(title: string): void;
  #showSubtitle(subtitle: string): void;
  #showError(): void;
  #showImage(image: {
    path: string;
    process: boolean;
    width?: number;
    height?: number;
    preserveAspectRatio?: boolean;
  }): Promise<void>;
  getUserInput({
    title,
    subtitle,
    image,
    action,
    error,
    options,
    noClear,
  }: {
    title: string;
    subtitle?: string;
    image?: {
      path: string;
      process?: boolean;
      width?: number;
      height?: number;
      preserveAspectRatio?: boolean;
    };
    action: (input: string) => void;
    error?: boolean;
    options?: string[];
    noClear?: boolean;
  }): Promise<void>;
  log({
    title,
    msg,
    color,
    noClear,
  }: {
    title?: string;
    msg: string;
    color?: string;
    noClear?: boolean;
  }): void;
  async waitForKey({
    title,
    msg,
    color,
    noClear,
  }: {
    title?: string;
    msg?: string;
    color?: string;
    noClear?: boolean;
  }): Promise<void>;
}

export default NCLI;
