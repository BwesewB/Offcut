import styles from './sectionLayout.module.css';

export default function SectionLayout({ 
    height = 'auto',
    minHeight = '0',
    sectionHeight = 'auto',
    display = 'flex',
    placeItems = 'center',
    children,
 }) {
    return (
        <>
            <div style={{height: height, minHeight: minHeight, display: display, placeItems: placeItems}} className={styles.sectionWrap}>
                <div className={styles.section} style={{height: sectionHeight}}>
                    {children}
                </div>
            </div>
        </>
    )
}