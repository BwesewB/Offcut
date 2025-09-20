import styles from "./styles/page.module.css";
import Image from "next/image";
import rock1 from "/public/images/LandscapeRock1.png"
import rock1_2 from "/public/images/LandscapeRock1-2.jpg"
import rock2 from "/public/images/LandscapeRock2-2.webp"
import rock2_1 from "/public/images/LandscapeRock2.webp"
import rock2vert from "/public/images/Rock3-2.png"
import rock2vert2 from "/public/images/Rock3-3.png"
import rock3vert1 from "/public/images/Rock4-3.png"
import rock3vert2 from "/public/images/Rock4-2.png"
import rock3 from "/public/images/LandscapeRock3-1.webp"
import MediaBlock from "./components/molecules/mediaBlock/MediaBlock";
import ScrollCycle from "./components/atoms/scrollcycle/ScrollCycle";
import SectionLayout from "./components/molecules/sectionLayout/sectionLayout";

export default function Home() {
  return (
    <>
    <ScrollCycle
      sectionA={
        <section className="pageLayout" style={{ border: '1px solid blue' }}>
          <div className={styles.heroContainer}>
            <h1 className={styles.title}>OFFCUT</h1>
          </div>
          <SectionLayout>
            <h2>info</h2>
            <div className={styles.textSection1}>
              <p className={`${"plarge"} ${styles.indentFirstLine}`}>Offcut is a personal study of material left in its natural state, shaped but not polished. A further exploration can reveal that value isn't always in what is resolved, but in what resists being made familiar.</p>
            </div>
          </SectionLayout>

          <SectionLayout height='80svh'>
            <div style={{ gridColumn: '1 / 4' }}>
              <MediaBlock image={rock1} alt="A stone on a white background"  />
            </div>
            <div style={{ gridColumn: '4 / 5' }}>
              <MediaBlock image={rock1_2} alt="A stone on a white background" fit="height" />
            </div>
          </SectionLayout>

          <SectionLayout minHeight='60svh'>
            <div className={styles.textSection2}  style={{ gridColumn: '4 / 5' }}>
              <h2>info</h2>
              <p>Lorem ipsum dolor sit amet consectetur. Pellentesque in sed sem in lectus vitae. Ipsum integer tincidunt venenatis quis. Enim ac urna nisl ullamcorper purus sollicitudin phasellus. Dictum consequat neque dui dolor consequat consequat integer eget amet. Consequat eget porttitor id at etiam vulputate in vivamus. Mauris aliquam lorem lectus arcu vitae sodales sollicitudin posuere cursus. Vestibulum volutpat commodo amet dolor. </p>
            </div>
          </SectionLayout>
          <SectionLayout>
            <div style={{ gridColumn: '1 / 6' }}>
              <MediaBlock image={rock2} alt="A stone on a white background" fit="height" />
              <div className={styles.textSection3}>
                <h2>info</h2>
                <p>Lorem ipsum dolor sit amet consectetur. </p>
              </div>
            </div>
          </SectionLayout>
          <SectionLayout>
            <div style={{ gridColumn: '3 / 6' }}>
              <MediaBlock image={rock2_1} alt="A stone on a white background" fit="height" />
            </div>
            <div className={styles.textSection4}>
              <p>Lorem ipsum dolor sit amet consectetur. </p>
            </div>
          </SectionLayout>
          
        </section>
      }
      sectionB={
        <section className="pageLayout" style={{ border: '1px solid red' }}>
          <h1>Section B</h1>
        </section>
      }
      bottomStripA={
        <div style={{ height: '100%', display: 'grid', placeItems: 'center', border: '1px solid green' }}>
          <p>Bottom strip (A)</p>
        </div>
      }
      topStripB={
        <div style={{ height: '100%', display: 'grid', placeItems: 'center' }}>
          <p className="plarge" style={{userSelect: 'none'}}>unf__ished</p>
        </div>
      }
    />

      {/* <main className="pageLayout">
        <div className={styles.heroContainer}>
          <h1 className={styles.title}>Offcut</h1>
          <MediaBlock image={rock1} alt="A stone on a white background" fit="height"/>
        </div>
        
        

        <TwoColumn 
          left={
            <TwoColumn 
              left={
                <div>
                  <p>
                    Offcut is a collection of computer generated stone shapes, created by Sebastien Fok. 
                    Each stone is unique and generated using a combination of algorithms and randomization techniques.
                    The stones are designed to be used as decorative elements in various design projects, such as websites, 
                    print materials, and digital art. The collection is constantly growing, with new stones being added regularly.
                  </p>
                  <MediaBlock image={rock2vert2} alt="A stone on a white background" fit="height"/>
                </div>
                
              }

            />
          }
          right={
            <MediaBlock image={rock2vert} alt="A stone on a white background"/>
          }
        />
        <GridLayout columns={5} height="300px">
          <div style={{ gridColumn: '1 / 2' }}><MediaBlock image={rock3vert1} alt="A stone on a white background" fit="height"/></div>
          <div style={{ gridColumn: '2 / 3' }}><MediaBlock image={rock3vert2} alt="A stone on a white background" fit="height"/></div>
          <div style={{ gridColumn: '4 / 6' }}><MediaBlock image={rock3} alt="A stone on a white background" fit="height"/></div>
        </GridLayout>
      </main> */}
    </>
  );
}
