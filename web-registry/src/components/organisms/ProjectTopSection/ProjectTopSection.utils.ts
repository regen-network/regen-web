const TOP_LINK_HEIGHT = 31;

type GetTopLinksBoxHeightProps = {
  creditClass: any;
  creditClassVersion: any;
  isVCSProject: boolean;
  methodologyVersion: any;
  registry: any;
};

export const getTopLinksBoxHeight = ({
  creditClass,
  creditClassVersion,
  isVCSProject,
  methodologyVersion,
  registry,
}: GetTopLinksBoxHeightProps) => {
  let boxHeight = 0;

  if (creditClass && creditClassVersion) {
    boxHeight += TOP_LINK_HEIGHT;
  }

  if (!isVCSProject) {
    boxHeight += TOP_LINK_HEIGHT;
  }

  if (methodologyVersion) {
    boxHeight += TOP_LINK_HEIGHT;
  }

  if (registry) {
    boxHeight += TOP_LINK_HEIGHT;
  }

  return `${boxHeight}px`;
};
