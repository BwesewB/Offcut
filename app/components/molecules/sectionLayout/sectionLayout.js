import styles from './sectionLayout.module.css';

export default function SectionLayout({ 
    height = '80svh',
    sectionHeight = 'auto',
    display = 'flex',
    placeItems = 'center',
    children,
 }) {
    return (
        <>
            <div style={{height: `clamp(20svh, 45svw, ${height})`, display: display, placeItems: placeItems, border: '1px solid red'}} >
                <div className={styles.section} style={{height: sectionHeight, border: '1px solid blue'}}>
                    {children}
                </div>
            </div>
        </>
    )
}