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
            <div style={{height: `clamp(20svh, 45svw, ${height})`, minHeight: minHeight, display: display, placeItems: placeItems, border: '1px solid red'}} >
                <div className={styles.section} style={{height: sectionHeight, border: '1px solid blue'}}>
                    {children}
                </div>
            </div>
        </>
    )
}