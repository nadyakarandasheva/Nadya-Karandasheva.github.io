import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RangeSlider } from 'src/shared/rangeSlider/RangeSlider';
import { Collapse } from 'src/shared/Collapse/Collapse';
import { Resizer } from 'src/shared/resizer/Resizer';
import { Tip } from 'src/shared/tip/Tip';
import logo from '../../app/logo.svg';

export const HomeWorksPage = () => {
  const [rangeValue, setRangeValue] = useState<number>(0);

  const [isOpened, setIsOpened] = useState<boolean>(false);

  const { t } = useTranslation();

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <Collapse opened={isOpened} onClick={() => { setIsOpened((prev) => !prev) }}>
        <p>
          {t('objectives')}:{' '}
          {t('goal.improve_skills')}
        </p>
        <p>
          {t('technologies.learning')}:{' '}
          {t('technologies.zoom_drawing_patterns')}{' '}
        </p>
        <p>
          {t('technologies.known')}:{' '}
          HTML, CSS, JS, TS, React.
        </p>
        <p>
          {t('about_me')}:{' '}
          {t('experience')}
        </p>
      </Collapse>
      <RangeSlider value={rangeValue} onChange={(value) => { setRangeValue(value) }} min={0} max={100} />
      <Tip title={'This is tip'}>
        <div>Some text</div>
      </Tip>
      <Resizer initialHeight={100} initialWidth={200}>
        {() => (
          <div>
            This is resizer content
          </div>
        )}
      </Resizer>
    </div>
  );
}