import styles from "./styles/page.module.css";

import MediaBlock from "./components/molecules/mediaBlock/MediaBlock";
import ScrollCycle from "./components/atoms/scrollcycle/ScrollCycle";
import SectionLayout from "./components/molecules/sectionLayout/sectionLayout";
import AnimatedText from "./components/atoms/animatedText/animatedText";

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

import chalk1 from "/public/images/Chalk1.png"
import chalk2_1 from "/public/images/Chalk2_1.png"
import chalk2_2 from "/public/images/Chalk2_2.png"
import chalk2_3 from "/public/images/Chalk2_3.png"
import chalkLandscape1 from "/public/images/ChalkLandscape1.png"
import chalkLandscape2 from "/public/images/ChalkLandscape2.png"


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
          <SectionLayout minHeight='30svh'>
            <h2>info</h2>
            <div className={styles.textSection1a}>
              <AnimatedText 
                text="Offcut is a personal study of material left in its natural state, shaped but not polished. A further exploration can reveal that value isn't always in what is resolved, but in what resists being made familiar."
                className={`${"plarge"} ${styles.indentFirstLine}`}
                tilt={true}
                trigger="80%"
              />
            </div>
          </SectionLayout>

          <SectionLayout >
            <div style={{ gridColumn: '1 / 4' }}>
              <MediaBlock image={rock1} alt="A stone on a white background" />
            </div>
            <div style={{ gridColumn: '4 / 5' }}>
              <MediaBlock image={rock1_2} alt="A stone on a white background" />
              <p>1</p>
            </div>
          </SectionLayout>

          <SectionLayout>
            <div className={styles.textSectionWTitle}  style={{ gridColumn: '2 / 3' }}>
              <h2>tora</h2>
              <AnimatedText 
                text="Lorem ipsum dolor sit amet consectetur. Pellentesque in sed sem in lectus vitae. Ipsum integer tincidunt venenatis quis. Enim ac urna nisl ullamcorper purus sollicitudin phasellus. Dictum consequat neque dui dolor consequat consequat integer eget amet. Consequat eget porttitor id at etiam vulputate in vivamus. Mauris aliquam lorem lectus arcu vitae sodales sollicitudin posuere cursus. Vestibulum volutpat commodo amet dolor. "
              />
            </div>
          </SectionLayout>

          <SectionLayout>
            <div style={{ gridColumn: '1 / 6' }}>
              <MediaBlock image={rock2} alt="A stone on a white background" />
              <div className={styles.textSection3a}>
                <h2>beak</h2>
                <p>Lorem ipsum dolor sit amet consectetur. </p>
              </div>
            </div>
          </SectionLayout>

          <div className={styles.beakDiv}>
            <SectionLayout>
              <div style={{ gridColumn: '1 / 2' }}>
                <AnimatedText 
                  text="Lorem ipsum dolor sit amet consectetur. Pellentesque in sed sem in lectus vitae. Ipsum integer tincidunt venenatis quis. Enim ac urna nisl ullamcorper purus sollicitudin phasellus. Dictum consequat neque dui dolor consequat consequat integer eget amet. Consequat eget porttitor id at etiam vulputate in vivamus. Mauris aliquam lorem lectus arcu vitae sodales sollicitudin posuere cursus. Vestibulum volutpat commodo amet dolor. "
                />
              </div>
              <div style={{ gridColumn: '3 / 6', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <MediaBlock image={rock2_1} alt="A stone on a white background" />
                <p>1</p>
              </div>
            </SectionLayout>

            <SectionLayout>
              <div style={{ gridColumn: '1 / 2' }}>
                <p>2</p>
                <MediaBlock image={rock2vert1} alt="A stone on a white background" />
              </div>
              <div style={{ gridColumn: '2 / 3' }}>
                <p>3</p>
                <MediaBlock image={rock2vert4} alt="A stone on a white background" />
              </div>
              <div style={{ gridColumn: '3 / 4' }}>
                <p>4</p>
                <MediaBlock image={rock2vert2} alt="A stone on a white background" />
              </div>
              <div style={{ gridColumn: '4 / 5' }}>
                <p>5</p>
                <MediaBlock image={rock2vert3} alt="A stone on a white background" />
              </div>
            </SectionLayout>
          </div>

          <SectionLayout>
            <div style={{ gridColumn: '1 / 4' }}>
              <AnimatedText 
                text="Lorem ipsum dolor sit amet consectetur. Iaculis potenti lobortis ornare vel. In sed libero arcu senectus et niwsl."
                className="plarge"
                tilt={true}
                trigger="80%"
              />
            </div>
          </SectionLayout>
          
          <SectionLayout>
            <div style={{ gridColumn: '1 / 4' }}>
              <MediaBlock image={rock3} alt="Rock 3. Fishbone" />
              <h2>bone</h2>
            </div>
            <div style={{ gridColumn: '5 / 6' }}>
              <AnimatedText 
                text="Lorem ipsum dolor sit amet consectetur. Enim tellus condimentum in id enim vel etiam aliquet donec. Amet eget suspendisse et in massa dolor. Enim sed netus integer donec a potenti orci. Aliquam fames amet morbi porta. Aliquam nulla condimentum eget urna morbi convallis. Quis vehicula fames lectus nisi at pulvinar in semper in. Consectetur interdum bibendum quisque quisque risus sed accumsan tortor habitasse. Suspendisse convallis nulla bibendum egestas venenatis suspendisse sit. Quis mauris arcu posuere mattis enim. Interdum eget auctor fermentum euismod at libero fames. Pretium in feugiat viverra feugiat nulla odio."
              />
            </div>
          </SectionLayout>

          <SectionLayout>
            <div className={styles.textSectionxa}>
              <AnimatedText 
                text="Lorem ipsum dolor sit amet consectetur. Enim tellus condimentum in id enim vel etiam aliquet donec. Amet eget suspendisse et in massa dolor. Enim sed netus integer donec a potenti orci. Aliquam fames amet morbi porta. Aliquam nulla condimentum eget urna morbi convallis. Quis vehicula fames lectus nisi at pulvinar in semper in. Consectetur interdum bibendum quisque quisque risus sed accumsan tortor habitasse. Suspendisse convallis nulla bibendum egestas venenatis suspendisse sit. Quis mauris arcu posuere mattis enim. Interdum eget auctor fermentum euismod at libero fames. Pretium in feugiat viverra feugiat nulla odio."
              />
            </div>
            <div style={{ gridColumn: '3 / 5' }}>
              <p>1</p>
              <MediaBlock image={rock3_2} alt="Rock 3. Fishbone" />
            </div>
            <div style={{ gridColumn: '5 / 6' }}>
              <p>2</p>
              <MediaBlock image={rock3_3} alt="Rock 3. Fishbone" />
            </div>
          </SectionLayout>
        </section>
      }

      //section b

      sectionB={
        <section className="pageLayout" style={{ border: '1px solid red' }}>
          <SectionLayout>
            <div style={{ gridColumn: '1 / 2' }}>
              <MediaBlock image={chalk2_1} alt="A stone on a white background" />
            </div>
            <div style={{ gridColumn: '2 / 3' }}>
              <MediaBlock image={chalk2_2} alt="A stone on a white background" />
            </div>
            <div style={{ gridColumn: '3 / 4' }}>
              <AnimatedText 
                text="Lorem ipsum dolor sit amet consectetur. Enim tellus condimentum in id enim vel etiam aliquet donec. Amet eget suspendisse et in massa dolor. Enim sed netus integer donec a potenti orci. Aliquam fames amet morbi porta. Aliquam nulla condimentum eget urna morbi convallis. Quis vehicula fames lectus nisi at pulvinar in semper in. Consectetur interdum bibendum quisque quisque risus sed accumsan tortor habitasse. Suspendisse convallis nulla bibendum egestas venenatis suspendisse sit. Quis mauris arcu posuere mattis enim. Interdum eget auctor fermentum euismod at libero fames. Pretium in feugiat viverra feugiat nulla odio."
                reverse={true}
              />
            </div>
            <div style={{ gridColumn: '5 / 6' }}>
              <MediaBlock image={chalk2_3} alt="A stone on a white background" />
            </div>
          </SectionLayout>

          <SectionLayout>
            <div style={{ gridColumn: '4 / 6', marginBottom: 'var(--gap)' }}>
              <AnimatedText 
                text="Lorem ipsum dolor sit amet consectetur."
                className="plarge"
                reverse={true}
                tilt={true}
              />
            </div>
            <div style={{ gridColumn: '2 / 6' }}>
              <MediaBlock image={chalkLandscape2} alt="A stone on a white background" />
            </div>
            <div style={{ gridColumn: '2 / 3', marginTop: 'var(--gap)' }}>
              <AnimatedText 
                text="Lorem ipsum dolor sit amet consectetur. Enim tellus condimentum in id enim vel etiam aliquet donec. Amet eget suspendisse et in massa dolor. Enim sed netus integer donec a potenti orci. Aliquam fames amet morbi porta. Aliquam nulla condimentum eget urna morbi convallis. Quis vehicula fames lectus nisi at pulvinar in semper in. Consectetur interdum bibendum quisque quisque risus sed accumsan tortor habitasse. Suspendisse convallis nulla bibendum egestas venenatis suspendisse sit. Quis mauris arcu posuere mattis enim. Interdum eget auctor fermentum euismod at libero fames. Pretium in feugiat viverra feugiat nulla odio."
                reverse={true}
              />            
            </div>
          </SectionLayout>

          <SectionLayout>
            <div style={{ gridColumn: '1 / 3' }}>
              <AnimatedText 
                text="Lorem ipsum dolor sit amet consectetur. Iaculis potenti lobortis ornare vel. In sed libero arcu senectus et."
                className="plarge"
                reverse={true}
                tilt={true}
              />
            </div>
            <div style={{ gridColumn: '4 / 5' }}>
              <MediaBlock image={chalk1} alt="A stone on a white background" width='80%' />
            </div>
          </SectionLayout>

          <SectionLayout>
            <div style={{ gridColumn: '1 / 4' }}>
              <MediaBlock image={chalkLandscape1} alt="A stone on a white background" />
            </div>
          </SectionLayout>

          <SectionLayout>
            <div style={{ gridColumn: '3 / 5' }}>
              <AnimatedText 
                text="Lorem ipsum dolor sit amet consectetur. Enim tellus condimentum in id enim vel etiam aliquet donec. Amet eget suspendisse et in massa dolor. Enim sed netus integer donec a potenti orci. Aliquam fames amet morbi porta. Aliquam nulla condimentum eget urna morbi convallis. Quis vehicula fames lectus nisi at pulvinar in semper in. Consectetur interdum bibendum quisque quisque risus sed accumsan tortor habitasse. Suspendisse convallis nulla bibendum egestas venenatis suspendisse sit. Quis mauris arcu posuere mattis enim. Interdum eget auctor fermentum euismod at libero fames. Pretium in feugiat viverra feugiat nulla odio. Blandit nisl diam purus orci mauris penatibus molestie diam amet. Ipsum eget donec tellus nibh nunc dapibus neque. Leo dolor mi habitasse nibh mattis quis. Viverra fermentum mattis morbi orci ac aliquet magna id. Nec aenean id elementum urna dictumst vitae dui. Viverra amet mi mattis orci amet non velit. Etiam magna erat odio ultrices fames. Sed varius tincidunt duis ac consequat scelerisque tellus nec. Senectus pretium porttitor euismod diam etiam tristique viverra ornare a. Dignissim eu consectetur tristique tellus tempus dictum sed venenatis. Quis etiam non amet eget lacus faucibus in elit vitae. Vitae proin sagittis eu curabitur sed ornare. Pellentesque ullamcorper fusce ullamcorper pharetra fusce amet."
                className={styles.textSection1b}
                reverse={true}
              />
            </div>
          </SectionLayout>
        </section>
      }
      bottomStripA={
        <SectionLayout minHeight="100svh" placeItems="end">
          <div style={{ gridColumn: '1 / 5' }}>
              <p className="plarge">Reaching the end just means you’re close to something worth returning to.</p>
          </div>
        </SectionLayout>
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
