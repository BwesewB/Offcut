import styles from "./styles/page.module.css";

import MediaBlock from "./components/molecules/mediaBlock/MediaBlock";
import ScrollCycle from "./components/atoms/scrollcycle/ScrollCycle";
import SectionLayout from "./components/molecules/sectionLayout/sectionLayout";
import SectionLayoutStack from "./components/organisms/sectionLayoutStack/sectionLayoutStack";
import AnimatedText from "./components/atoms/animatedText/animatedText";
import AnimatedLetters from "./components/atoms/animatedLetters/AnimatedLetters";
import MiniTextStack from "./components/molecules/miniTextStack/miniTextStack";
import LottieArrow from "/public/icons/ArrowLottie";

import rock1 from "/public/images/LandscapeRock1.png"
import rock1_2 from "/public/images/LandscapeRock1-2.jpg"
import rock2 from "/public/images/LandscapeRock2-2.jpg"
import rock2_1 from "/public/images/LandscapeRock2.jpg"
import rock2vert1 from "/public/images/Rock3-1.png"
import rock2vert2 from "/public/images/Rock3-2.png"
import rock2vert3 from "/public/images/Rock3-3.png"
import rock2vert4 from "/public/images/Rock3-4.png"
import rock3 from "/public/images/LandscapeRock3.jpg"
import rock3_2 from "/public/images/Rock4-2.png"
import rock3_3 from "/public/images/Rock4-3.jpg"
import TextureRock from "/public/images/TextureRockLogo.png"
import PerfectCircle from "/public/icons/Ellipse2.svg"

import chalk1 from "/public/images/Chalk1.png"
import chalk2_1 from "/public/images/Chalk2_1.png"
import chalk2_2 from "/public/images/Chalk2_2.png"
import chalk2_3 from "/public/images/Chalk2_3.png"
import chalkLandscape1 from "/public/images/ChalkLandscape1.png"
import chalkLandscape2 from "/public/images/ChalkLandscape2.png"
import HoverImage from "./components/atoms/hoverImage/hoverImage";

export default function Home() {
  return (
    <>
    <ScrollCycle
      sectionA={
        <section className="pageLayout">
          <div className={styles.heroContainer}>
            <div className={styles.heroContainerText}>
              <div className={styles.heroContainerTextTop}>
                {/* <h2>computer generated stone shapes</h2> */}
              </div>
              <div className={styles.heroContainerTextBottom}>
                <AnimatedLetters text="OFFCUT" className={styles.title}/>
                <div className={styles.heroArrow}>
                  <LottieArrow/>
                </div>
                {/* <h2>info</h2> */}
              </div>
            </div>
            <HoverImage />
          </div>

          <SectionLayout minHeight='30lvh'>
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

          <SectionLayoutStack
            gap="var(--heightGap)"
            sections={[
              {
                children: 
                <>
                  <div className={styles.textSectionWTitle} style={{ gridColumn: '1 / 2'}}>
                    <h4>01.</h4>
                    <h2>tora</h2>
                  </div>
                  <div style={{ gridColumn: '2 / 3'}}>
                    <h3>XXX.</h3>
                  </div>
                  <div style={{ gridColumn: '3 / 5'}}>
                    <AnimatedText 
                      text="Each piece begins with a simple volume, then changes through pressure, removal, and restraint. Material is left close to its original form, adjusted only as much as necessary to hold its shape. Rather than aiming for resolution, the process allows surfaces to remain uneven, fractured, and exposed."
                    />
                  </div>
                </>
                  ,
              },
              {
                children:
                  <> 
                    <div style={{ gridColumn: '2 / 5' }}>
                      <MediaBlock image={rock1} alt="A stone on a white background" />
                    </div>
                    <div style={{ gridColumn: '5 / 6' }}>
                      <MediaBlock image={rock1_2} alt="A stone on a white background" />
                      <p>1</p>
                    </div>
                  </>,
              },
            ]}
          />

          <SectionLayoutStack
            gap="var(--heightGap)"
            sections={[
              {
                children: 
                <>
                  <div style={{ gridColumn: '1 / 2'}}>
                    <MiniTextStack
                      grayText="Fig 1."
                      blackText="1: A Perfect Circle"
                    />
                  </div>
                  <div style={{ gridColumn: '1 / 3', paddingTop: 'var(--gap)'}}>
                    <p>A series of perfect shapes questioning what makes something truly interesting.</p>
                  </div>
                </>,
              },
              {
                children:
                  <> 
                    <div style={{ gridColumn: '1 / 6'}}>
                      <MediaBlock image={PerfectCircle} alt="ww" />
                    </div>
                  </>,
              },
            ]}
          />

          <SectionLayoutStack
            gap="calc(var(--heightGap) / 2)"
            sections={[
              {
                children: 
                <>
                  <div className={styles.textSectionWTitle} style={{ gridColumn: '1 / 2'}}>
                    <h4>02.</h4>
                    <h2>fragments</h2>
                  </div>
                  <div style={{ gridColumn: '2 / 3'}}>
                    <p>Moments where ideas briefly take shape.</p>
                  </div>
                  <div style={{ gridColumn: '4 / 5'}}>
                    <div className={styles.heroArrow}>
                      <LottieArrow rotation={270} size="6rem"/>
                    </div>
                  </div>
                </>,
              },
              {
                children:
                  <> 
                    <div style={{ gridColumn: '1 / 6' }}>
                      <MediaBlock image={rock2} alt="A stone on a white background" />
                    </div>
                  </>,
              },
            ]}
          />

          <SectionLayoutStack
            gap="var(--containerGap)"
            sections={[
              {
                children: 
                <>
                  <div style={{ gridColumn: '1 / 2', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <MiniTextStack
                      grayText="Stone Chiseling "
                      blackText="Debitage"
                    />
                    <p>When stone is cut, the removed material becomes debitage. These fragments carry information about how the cut was made, including force, precision, and restraint. The surface that remains is shaped as much by what was taken away as by what was left intact.</p>
                  </div>
                  <div style={{ gridColumn: '3 / 6'}}>
                      <MediaBlock image={rock2_1} alt="A stone on a white background" />
                  </div>
                </>,
              },
              {
                children:
                  <> 
                      <div style={{ gridColumn: '1 / 2' }}>
                        <div>
                          <p className="pBold">Refinement</p>
                          <p style={{ color: "var(--gray)", paddingTop: "var(--gap)" }}>Over time, small refinements begin to accumulate. Each adjustment improves something, but it also changes the original intention.</p>
                        </div>
                      </div>
                      <div style={{ gridColumn: '2 / 3' }}>
                        <MediaBlock image={rock2vert1} alt="A stone on a white background" width='100%'/>
                        <p style={{ paddingTop: "var(--gap)" }}>The process of refining something can slowly move it further from the moment it first appeared. What began as a simple idea becomes layered with decisions made later.</p>
                      </div>
                      <div style={{ gridColumn: '3 / 4' }}>
                        <MediaBlock image={rock2vert4} alt="A stone on a white background" width='100%'/>
                      </div>
                      <div style={{ gridColumn: '4 / 5' }}>
                        <MediaBlock image={rock2vert2} alt="A stone on a white background" width='100%'/>
                        <p className="pBold" style={{ paddingTop: "var(--gap)" }}>Refinement clarifies, but can also erase.</p>
                      </div>
                      <div style={{ gridColumn: '5 / 6' }}>
                        <MediaBlock image={rock2vert3} alt="A stone on a white background" width='100%'/>
                      </div>
                  </>,
              },
            ]}
          />

          {/* <div className={styles.beakDiv}>
            <SectionLayout paddingBottom="0">
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

            <SectionLayout paddingBottom="0">
              <div style={{ gridColumn: '1 / 2' }}>
                <p>2</p>
                <MediaBlock image={rock2vert1} alt="A stone on a white background" width='90%'/>
              </div>
              <div style={{ gridColumn: '2 / 3' }}>
                <p>3</p>
                <MediaBlock image={rock2vert4} alt="A stone on a white background" width='90%'/>
              </div>
              <div style={{ gridColumn: '3 / 4' }}>
                <p>4</p>
                <MediaBlock image={rock2vert2} alt="A stone on a white background" width='90%'/>
              </div>
              <div style={{ gridColumn: '4 / 5' }}>
                <p>5</p>
                <MediaBlock image={rock2vert3} alt="A stone on a white background" width='90%'/>
              </div>
            </SectionLayout>
          </div> */}


          <SectionLayout>
            <div style={{ gridColumn: '1 / 4' }}>
              <AnimatedText 
                text="The longer something exists, the more versions of it begin to accumulate. Each one slightly different from the last."
                className={`${"plarge"} ${styles.indentFirstLine2}`}
                tilt={true}
                trigger="80%"
              />
            </div>
          </SectionLayout>
          

          
          <SectionLayout paddingBottom="var(--layoutSpacingSmall)">
            <div style={{ gridColumn: '1 / 4'}}>
                <MediaBlock image={rock3} alt="Rock 3. Fishbone" />
            </div>
            <div style={{ gridColumn: '4 / 6', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div className={styles.textSectionWTitle}>
                <h4>03.</h4>
                <h2>bone</h2>
              </div>
              <AnimatedText 
                text="An idea can begin simply, existing in a state where it does not need to fully explain itself or justify the direction it might eventually take. Over time, however, returning to that same idea introduces new interpretations, and what once felt settled begins to feel open again in ways that were not originally expected. What was once accepted as it was now quietly invites reconsideration."
              />
            </div>
          </SectionLayout>

          <SectionLayout paddingBottom="0">
            <div className={styles.textSectionxa}>
              <div style={{ width: "100%" }}>
                <p className="pBold">Lorem ipsum dolor </p>
                <p style={{ color: "var(--gray)" }}>sit amet consectetur.</p>
              </div>
              <AnimatedText
                color="var(--gray)"
                text="With that reconsideration comes the urge to strengthen the thinking behind it, to clarify what it means and shape it into something that feels more deliberate and complete. Each adjustment promises a clearer version of the same idea, yet every change also replaces the moment that existed before it. What began as something simple slowly becomes layered with decisions that arrived later. At some point a quieter question begins to appear, one that is harder to resolve than the changes themselves."
              />
            </div>
            <div style={{ gridColumn: '3 / 5' }}>
              <MediaBlock image={rock3_2} alt="Rock 3. Fishbone" width='100%'/>
            </div>
            <div style={{ gridColumn: '5 / 6' }}>
              <MediaBlock image={rock3_3} alt="Rock 3. Fishbone" />
              <AnimatedText 
                text="Is the idea becoming stronger through refinement, or simply becoming something different from the moment it first appeared? The process continues either way, circling between the desire to improve what exists and the hesitation to move too far from where it began."
              />
              <p></p>
            </div>
          </SectionLayout>
        </section>
      }

      //section b

      sectionB={
        <section className="pageLayout"> 
         {/* style={{ border: '1px solid red' }} */}
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

          <SectionLayout paddingBottom="0">
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
        <SectionLayout minHeight="100lvh" placeItems="end" paddingBottom="0">
          <div style={{ gridColumn: '1 / 5' }}>
              <p className="plarge">Reaching the end just means you’re close to something worth returning to.</p>
          </div>
          <div style={{ gridColumn: '5 / 6', display: 'flex', justifyContent: 'flex-end' }}>
            <LottieArrow rotation={270}/>
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
