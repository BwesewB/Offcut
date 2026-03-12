import styles from "../../styles/page.module.css";

import MediaBlock from "../molecules/mediaBlock/MediaBlock"
import ScrollCycle from "../atoms/scrollcycle/ScrollCycle";
import SectionLayout from "../molecules/sectionLayout/sectionLayout";
import SectionLayoutStack from "../organisms/sectionLayoutStack/sectionLayoutStack";
import AnimatedText from "../atoms/animatedText/animatedText";
import AnimatedLetters from "../atoms/animatedLetters/AnimatedLetters";
import MiniTextStack from "../molecules/miniTextStack/miniTextStack";
import MobileHeaderStack from "../molecules/mobileHeaderStack/mobileHeaderStack";
import LottieArrow from "/public/icons/ArrowLottie";
import HoverImage from "../atoms/hoverImage/hoverImage"

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
import RockFragment from "/public/icons/RockFragment.svg"
import ToraRock from "/public/icons/Tora.svg"
import RockTriplet from "/public/icons/RockTriplet.svg"

import chalk1 from "/public/images/Chalk1.png"
import chalk2_1 from "/public/images/Chalk2_1.png"
import chalk2_2 from "/public/images/Chalk2_2.png"
import chalk2_3 from "/public/images/Chalk2_3.png"
import chalkLandscape1 from "/public/images/ChalkLandscape1.png"
import chalkLandscape2 from "/public/images/ChalkLandscape2.png"
import heroRock from '/public/images/TransparentRockHeroMobile.png';


export default function HomeMobile() {
  return (
    <main>
      <ScrollCycle 
        sectionA={
            <section className="pageLayout">
                <div className={styles.heroContainer}>
                    <div className={styles.heroContainerText}>
                        <div className={styles.heroContainerTextBottom}>
                            <AnimatedLetters text="OFFCUT" className={styles.title}/>
                            <div className={styles.heroArrow}>
                                <LottieArrow immediate size="clamp(2.5rem, 14vw, 8rem)"/>
                            </div>
                        </div>
                    </div>
                    <MediaBlock image={heroRock} alt="A stone on a white background" revealOnLoad />
                </div>

                <SectionLayout paddingBottom="16rem">
                    <h2 style={{color: "var(--gray)", fontSize: "1.5rem"}}>info</h2>
                    <div style={{ gridColumn: '1 / 5' }}>
                        <AnimatedText 
                            text="Offcut is a personal study of material left in its natural state, shaped but not polished. The act of polishing can refine a version that feels more certain, but moves further from where it began."
                            className="plarge"
                            tilt={true}
                            trigger="80%"
                        />
                    </div>

                </SectionLayout>
                    
                <SectionLayout paddingBottom="2rem">
                    <MobileHeaderStack
                        gridColumn="1 / 5"
                        number="1"
                        name="tora"
                        text="Each piece represents a product of natural form, shaped through a specific sequence of events that leaves behind its own story. Rather than refining the result toward completion, the process aims to resist polishing; the human imposition of beauty onto an object that carries its own character."
                    />
                </SectionLayout>

                <SectionLayoutStack
                    gap="1rem"
                    sections={[
                    {
                        children: 
                            <>
                                <div style={{ gridColumn: '3 / 5' }}>
                                    <MediaBlock 
                                        image={rock1_2} 
                                        alt="A stone on a white background" 
                                        parallax={true}
                                    />
                                    
                                </div>
                            </>
                        ,
                    },
                    {
                        children:
                        <> 
                            
                            <div style={{ gridColumn: '1 / 5' }}>
                                <MediaBlock 
                                    image={rock1} 
                                    parallaxScale={1.2}
                                    parallax={true}
                                    alt="A stone on a white background" 
                                />
                            </div>
                        </>,
                    },
                    ]}
                />
            </section>
        }
        sectionB={
            <section className="pageLayout">
                
            </section>
        }
        bottomStripA={
            <SectionLayout minHeight="100lvh" placeItems="end" paddingBottom="0">
                <div style={{ gridColumn: '1 / 4', display: 'flex', alignItems: 'end'  }}>
                    <p className="plarge">Reaching the end just means you’re close to something worth returning to.</p>
                </div>
                <div style={{ gridColumn: '4 / 6', display: 'flex', justifyContent: 'flex-end'}}>
                    <div className={styles.rockTriplet}>
                        <MediaBlock
                            image={RockTriplet}
                            alt="Three Rock Shapes"
                        />
                    </div>
                </div>
            </SectionLayout>
        }
        topStripB={
        <div style={{ height: '100%', display: 'grid', placeItems: 'center' }}>
            <p className="plarge" style={{userSelect: 'none'}}>unf__ished</p>
        </div>
        }
      />
    </main>
  );
}