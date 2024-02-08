import { useCallback, useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import { Point } from 'geojson';

import { UseStateSetter } from '../../../../types/react/useState';
import ArrowDownIcon from '../../../icons/ArrowDownIcon';
import { Body } from '../../../typography';
import { PostFile } from '../PostFiles';
import { getIconForFiles } from '../PostFiles.utils';

type Props = {
  files: Array<PostFile>;
  onClose: () => void;
  setSelectedUrl: UseStateSetter<string | undefined>;
  setSelectedLocation?: UseStateSetter<Point | undefined>;
  selectedUrl: string;
  classNames?: {
    root?: string;
    slider?: string;
  };
  items: React.ReactNode;
  controls?: boolean;
};

const Cards: React.FC<React.PropsWithChildren<Props>> = ({
  files,
  onClose,
  setSelectedUrl,
  setSelectedLocation,
  selectedUrl,
  classNames,
  items,
  controls,
  children,
}) => {
  const initialSlide = files.findIndex(file => file.url === selectedUrl);
  const [selectedIndex, setSelectedIndex] = useState<number>(initialSlide);

  const settings = {
    initialSlide: selectedIndex,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (currentSlide: number) => {
      if (selectedIndex !== currentSlide) {
        setSelectedIndex(currentSlide);
      }
      const file = files[currentSlide];
      setSelectedUrl(file.url);
      if (setSelectedLocation) setSelectedLocation(file.location);
    },
  };

  const slider = useRef<Slider>(null);

  useEffect(() => {
    if (initialSlide !== selectedIndex) {
      slider.current?.slickGoTo(initialSlide, true);
      setSelectedIndex(initialSlide);
    }
  }, [initialSlide, selectedIndex]);

  const slickPrev = useCallback(() => {
    slider.current?.slickPrev();
  }, [slider]);

  const slickNext = useCallback(() => {
    slider.current?.slickNext();
  }, [slider]);

  return (
    <div className={classNames?.root}>
      <Slider {...settings} className={classNames?.slider} ref={slider}>
        {items}
      </Slider>
      {controls && files.length > 1 && (
        <div
          onClick={slickNext}
          className="hidden group-hover:block cursor-pointer absolute top-[50%] -translate-y-[50%] right-[25px]"
        >
          <ArrowDownIcon
            direction="next"
            className="h-30 w-30 rounded-[50%] bg-grey-0 p-3"
          />
        </div>
      )}
      {controls && files.length > 1 && (
        <div
          onClick={slickPrev}
          className="hidden group-hover:block cursor-pointer absolute top-[50%] -translate-y-[50%] left-[25px]"
        >
          <ArrowDownIcon
            direction="prev"
            className="h-30 w-30 rounded-[50%] bg-grey-0 p-3"
          />
        </div>
      )}

      {controls && files.length > 1 && (
        <div className="flex items-center absolute bottom-10 right-[13px]">
          <Body className="text-grey-0 font-semibold pr-5" size="xs">
            {`${selectedIndex + 1} / ${files.length}`}
          </Body>
          <div className="text-grey-0 right-[13px]">
            {getIconForFiles(files)}
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export { Cards };
