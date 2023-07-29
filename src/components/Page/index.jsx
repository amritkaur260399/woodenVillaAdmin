import React from 'react';
import styles from './index.less';

const Page = (props) => {
  const {
    title,
    titleMetaData,
    subTitle,
    thumbnail,
    breadcrumbs,
    primaryAction,
    secondaryActions,
    additionalNavigation,
    children,
    expanded,
  } = props;
  return (
    <div className={styles.Page} style={{ maxWidth: expanded ? '' : '90.8rem' }}>
      {/* <div className="Header Header--separator Header--hasNavigation Header--hasActionMenu"> */}
      <div className={styles.Header}>
        <div className={`${styles.MainContent} flex-wrap `}>
          <div className={styles.TitleActionMenuWrapper}>
            <div className={styles.TitleHasThumbnail}>
              {thumbnail && <div className={styles.Thumbnail}>{thumbnail}</div>}
              <div className={styles.TitleAndSubtitleWrapper}>
                <div className={styles.TitleWithMetadataWrapper}>
                  <div className={styles.PageTitle}>
                    <div className="font-bold text-xl">{title}</div>
                  </div>
                  {titleMetaData && <div className={styles.TitleMetadata}>{titleMetaData}</div>}
                </div>
                {subTitle && <div className={styles.SubTitle}>{subTitle}</div>}
              </div>
            </div>
            {secondaryActions && <div className={styles.ActionMenuWrapper}>{secondaryActions}</div>}
          </div>
          {primaryAction && (
            <div className={`${styles.PrimaryActionWrapper} my-2 md:my-0`}>{primaryAction}</div>
          )}
        </div>
        <div className={styles.Navigation}>
          {breadcrumbs && breadcrumbs}
          {additionalNavigation && (
            <div className={styles.AdditionalNavigationWrapper}>{additionalNavigation}</div>
          )}
        </div>
      </div>
      <div className="Polaris-Page__Content">
        <div>{children}</div>
      </div>
    </div>
  );
};
Page.defaultProps = {
  title: null,
  titleMetaData: null,
  subTitle: null,
  breadcrumbs: null,
  thumbnail: null,
  primaryAction: null,
  secondaryActions: null,
  pagination: null,
};
export default Page;
