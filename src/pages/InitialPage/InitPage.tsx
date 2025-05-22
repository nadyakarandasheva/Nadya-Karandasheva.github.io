import React, { FC } from "react";

import styles from './InitPage.module.css';

export const InitPage: FC = () => {
  return <div className={styles.container}>
    <h4>{"Учебный проект, приложение учета доходов/расходов"}</h4>
    <p>{"Карандашева Надежда"}</p>
  </div>
}