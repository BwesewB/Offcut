import styles from "./styles/page.module.css";
import rock1 from "/public/images/LandscapeRock1.png"
import rock1_2 from "/public/images/LandscapeRock1-2.jpg"
import rock2 from "/public/images/LandscapeRock2-2.webp"
import rock2_1 from "/public/images/LandscapeRock2.webp"
import rock2vert1 from "/public/images/Rock3-1.png"
import rock2vert2 from "/public/images/Rock3-2.png"
import rock2vert3 from "/public/images/Rock3-3.png"
import rock2vert4 from "/public/images/Rock3-4.png"
import rock3 from "/public/images/LandscapeRock3.webp"
import rock3_2 from "/public/images/Rock4-2.png"
import rock3_3 from "/public/images/Rock4-3.jpg"
import chalkRock1 from "/public/images/ChalkRock1.png"
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
            {/* <h1 className={styles.title}>OFFCUT</h1> */}
            <video src="/videos/ChalkAnimationWAnimeLogo.mp4" autoPlay loop />
          </div>
          <SectionLayout minHeight='60svh'>
            <h2>info</h2>
            <div className={styles.textSection1}>
              <p className={`${"plarge"} ${styles.indentFirstLine}`}>Offcut is a personal study of material left in its natural state, shaped but not polished. A further exploration can reveal that value isn't always in what is resolved, but in what resists being made familiar.</p>
            </div>
          </SectionLayout>

          <SectionLayout minHeight='80svh'>
            <div style={{ gridColumn: '1 / 4' }}>
              <MediaBlock image={rock1} alt="A stone on a white background" fit="height" />
            </div>
            <div style={{ gridColumn: '4 / 5' }}>
              <MediaBlock image={rock1_2} alt="A stone on a white background" fit="height" />
              <p>1</p>
            </div>
          </SectionLayout>

          <SectionLayout>
            <div className={styles.textSection2}  style={{ gridColumn: '4 / 5' }}>
              <h2>tora</h2>
              <p>Lorem ipsum dolor sit amet consectetur. Pellentesque in sed sem in lectus vitae. Ipsum integer tincidunt venenatis quis. Enim ac urna nisl ullamcorper purus sollicitudin phasellus. Dictum consequat neque dui dolor consequat consequat integer eget amet. Consequat eget porttitor id at etiam vulputate in vivamus. Mauris aliquam lorem lectus arcu vitae sodales sollicitudin posuere cursus. Vestibulum volutpat commodo amet dolor. </p>
            </div>
          </SectionLayout>
          <SectionLayout>
            <div style={{ gridColumn: '1 / 6' }}>
              <MediaBlock image={rock2} alt="A stone on a white background" fit="height" />
              <div className={styles.textSection3}>
                <h2>beak</h2>
                <p>Lorem ipsum dolor sit amet consectetur. </p>
              </div>
            </div>
          </SectionLayout>

          <SectionLayout minHeight='80svh'>
            <div style={{ gridColumn: '1 / 2' }}>
              <p>Lorem ipsum dolor sit amet consectetur. Enim tellus condimentum in id enim vel etiam aliquet donec. Amet eget suspendisse et in massa dolor. Enim sed netus integer donec a potenti orci. Aliquam fames amet morbi porta. Aliquam nulla condimentum eget urna morbi convallis. Quis vehicula fames lectus nisi at pulvinar in semper in. Consectetur interdum bibendum quisque quisque risus sed accumsan tortor habitasse. Suspendisse convallis nulla bibendum egestas venenatis suspendisse sit. Quis mauris arcu posuere mattis enim. Interdum eget auctor fermentum euismod at libero fames. Pretium in feugiat viverra feugiat nulla odio. </p>
            </div>
            <div style={{ gridColumn: '3 / 6', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <MediaBlock image={rock2_1} alt="A stone on a white background" fit="height" />
              <p>1</p>
            </div>
          </SectionLayout>

          <SectionLayout minHeight='60svh'>
            <div style={{ gridColumn: '1 / 2' }}>
              <p>2</p>
              <MediaBlock image={rock2vert1} alt="A stone on a white background" fit="height" />
            </div>
            <div style={{ gridColumn: '2 / 3' }}>
              <p>3</p>
              <MediaBlock image={rock2vert4} alt="A stone on a white background" fit="height" />
            </div>
            <div style={{ gridColumn: '3 / 4' }}>
              <p>4</p>
              <MediaBlock image={rock2vert2} alt="A stone on a white background" fit="height" />
            </div>
            <div style={{ gridColumn: '4 / 5' }}>
              <p>5</p>
              <MediaBlock image={rock2vert3} alt="A stone on a white background" fit="height" />
            </div>
          </SectionLayout>

          <SectionLayout minHeight='80svh'>
            <div style={{ gridColumn: '1 / 4' }}>
              <p className="plarge">Lorem ipsum dolor sit amet consectetur. Iaculis potenti lobortis ornare vel. In sed libero arcu senectus et niwsl.</p>
            </div>
          </SectionLayout>
          
          <SectionLayout minHeight='80svh'>
            <div style={{ gridColumn: '1 / 4' }}>
              <MediaBlock image={rock3} alt="Rock 3. Fishbone" fit="height" />
              <h2>bone</h2>
            </div>
            <div style={{ gridColumn: '5 / 6' }}>
              <p>Lorem ipsum dolor sit amet consectetur. Enim tellus condimentum in id enim vel etiam aliquet donec. Amet eget suspendisse et in massa dolor. Enim sed netus integer donec a potenti orci. Aliquam fames amet morbi porta. Aliquam nulla condimentum eget urna morbi convallis. Quis vehicula fames lectus nisi at pulvinar in semper in. Consectetur interdum bibendum quisque quisque risus sed accumsan tortor habitasse. Suspendisse convallis nulla bibendum egestas venenatis suspendisse sit. Quis mauris arcu posuere mattis enim. Interdum eget auctor fermentum euismod at libero fames. Pretium in feugiat viverra feugiat nulla odio. </p>
            </div>
          </SectionLayout>

          <SectionLayout>
            <div className={styles.textSection4}>
              <p>Lorem ipsum dolor sit amet consectetur. Iaculis potenti lobortis ornare vel. In sed libero arcu senectus et niwsl.</p>
            </div>
            <div style={{ gridColumn: '3 / 5' }}>
              <p>1</p>
              <MediaBlock image={rock3_2} alt="Rock 3. Fishbone" fit="height" />
            </div>
            <div style={{ gridColumn: '5 / 6' }}>
              <p>2</p>
              <MediaBlock image={rock3_3} alt="Rock 3. Fishbone" fit="height" />
            </div>
          </SectionLayout>
        </section>
      }
      sectionB={
        <section className="pageLayout" style={{ border: '1px solid red' }}>
          <h1>Section B</h1>
          <SectionLayout>
            <div style={{ gridColumn: '1 / 6' }}>
                <MediaBlock image={chalkRock1} alt="A stone on a white background" fit="height" />
            </div>
          </SectionLayout>

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
