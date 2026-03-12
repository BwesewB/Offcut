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
import MobileCarousel from "../molecules/mobileCarousel/mobileCarousel";

import rock1 from "/public/images/LandscapeRock1.png"
import rock1_2 from "/public/images/LandscapeRock1-2.jpg"
import rock2 from "/public/images/FragmentStonePortrait.png"
import rock2_1 from "/public/images/LandscapeRock2.jpg"
import rock2vert1 from "/public/images/Rock3-1.png"
import rock2vert2 from "/public/images/Rock3-2.png"
import rock2vert3 from "/public/images/Rock3-3.png"
import rock2vert4 from "/public/images/Rock3-4.png"
import rock3 from "/public/images/LandscapeRock3.jpg"
import rock3_2 from "/public/images/Rock4-2.png"
import rock4_3 from "/public/images/Rock4-4.png"
import TextureRock from "/public/images/TextureRockLogo.png"
import BoneRocksGroup from "/public/images/BoneRocksGroup.png"


import PerfectCircle from "/public/icons/Ellipse2.svg"
import FragmentRocksGroup from "/public/icons/FragmentRocksGroup.svg"
import RockTriplet from "/public/icons/RockTriplet.svg"

import ChalkPortraitFirst from "/public/images/ChalkPortraitFirst.png"
import chalk1 from "/public/images/Chalk1.png"
import chalk2_1 from "/public/images/Chalk2_1.png"
import chalk2_2 from "/public/images/Chalk2_2.png"
import chalk2_3Long from "/public/images/Chalk2_3Long.png"
import chalkLandscape1 from "/public/images/ChalkLandscape1.png"
import ChalkLandscape2Mobile from "/public/images/ChalkLandscape2Mobile.png"
import heroRock from '/public/images/TransparentRockHeroMobile.png';


export default function HomeMobile() {
    const carouselItems = [
        { image: rock2vert1, alt: 'Fragment Stone angle 1'},
        { image: rock2vert4, alt: 'Fragment Stone angle 2'},
        { image: rock2vert2, alt: 'Fragment Stone angle 3'},
        { image: rock2vert3, alt: 'Fragment Stone angle 4'},
    ];


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
                    <h2 style={{color: "var(--gray)", fontSize: "1.5rem", paddingBottom: "var(--gap)"}}>info</h2>
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
                                    alt="A stone on a white background" 
                                />
                            </div>
                        </>,
                    },
                    ]}
                />

                <SectionLayoutStack
                    gap="4.5rem"
                    paddingBottom="0"
                    sections={[
                        {
                            children: 
                            <>
                                <div style={{ gridColumn: '1 / 5'}}>
                                    <MiniTextStack
                                        grayText="Figure 1"
                                        blackText="A Perfect Circle"
                                    />
                                </div>
                                <div style={{ gridColumn: '1 / 5', paddingTop: 'var(--gap)'}}>
                                    <AnimatedText 
                                        text="Every attempt of refinement circles back to the question that created it."
                                    />
                                </div>
                            </>,
                        },
                        {
                            children:
                            <> 
                                <div style={{ gridColumn: '1 / 6'}}>
                                    <MediaBlock image={PerfectCircle} alt="2D Circular object" />
                                </div>
                            </>,
                        },
                    ]}
                />

                <SectionLayout paddingBottom="4.5rem">
                    <div style={{ gridColumn: '3 / 4', marginTop: '48px' }}>
                        <LottieArrow rotation={270} size="6rem"/>
                    </div>
                </SectionLayout>

                <SectionLayoutStack
                    gap="2rem"
                    sections={[
                            {
                                children: 
                                <>
                                    <MobileHeaderStack
                                        gridColumn="1 / 5"
                                        number="2"
                                        name="fragments"
                                        text="Moments where ideas briefly take shape."
                                    />
                                </>,
                            },
                            {
                                children: 
                                <>
                                    <div style={{ gridColumn: '1 / 5'}}>
                                        <MediaBlock 
                                            image={rock2} 
                                            alt="A fragment of a stone" 
                                        />
                                    </div>
                                    
                                </>,
                            },
                        ]}
                />
                
                <SectionLayoutStack
                    gap="2rem"
                    sections={[
                        {
                            children: 
                            <>
                                <div style={{ gridColumn: '1 / 5'}}>
                                    <MiniTextStack
                                        grayText="Stone Chiseling"
                                        blackText="Debitage"
                                    />
                                </div>
                                <div style={{ gridColumn: '1 / 5', paddingTop: 'var(--gap)'}}>
                                    <AnimatedText 
                                        text="When stone is cut, the removed material becomes debitage. These fragments carry information about how the cut was made, including force, precision, and restraint. The surface that remains is shaped as much by what was taken away as by what was left intact."
                                    />
                                </div>
                            </>,
                        },
                        {
                            children:
                            <> 
                                <div style={{ gridColumn: '1 / 5'}}>
                                    <MediaBlock
                                        image={rock2_1} 
                                        alt="A stone on a white background" 
                                    />
                                </div>
                            </>,
                        },
                    ]}
                />

                <SectionLayoutStack
                    gap="4.5rem"
                    paddingBottom="16rem"
                    sections={[
                        {
                            children: 
                            <>
                                <div style={{ gridColumn: '1 / 5'}}>
                                    <p className="pBold">Refinement</p>
                                </div>
                                <div style={{ gridColumn: '1 / 5', paddingTop: 'var(--gap)'}}>
                                    <AnimatedText 
                                        text="Over time, small refinements begin to accumulate. Each adjustment improves something, but it also changes the original intention."
                                    />
                                </div>
                            </>,
                        },
                        {
                            children:
                            <> 
                                <div style={{ gridColumn: '1 / 5'}}>
                                    <MobileCarousel items={carouselItems} />
                                </div>
                            </>,
                        },
                        {
                            children:
                            <> 
                                <div style={{ gridColumn: '1 / 5'}}>
                                    <AnimatedText 
                                        text="The process of refining something can slowly move it further from the moment it first appeared. What began as a simple idea becomes layered with decisions made later."
                                    />
                                </div>
                            </>,
                        },
                    ]}
                />
                <SectionLayout>
                    <div style={{ gridColumn: '1 / 5' }}>
                        <AnimatedText 
                            text="The longer something exists, the more versions of it begin to accumulate. Each one slightly different from the last."
                            className="plarge"
                            tilt={true}
                            trigger="80%"
                        />
                    </div>
                </SectionLayout>

                <SectionLayoutStack
                    gap="3rem"
                    paddingBottom="0"
                    sections={[
                        {
                            children: 
                            <>
                                <div style={{ gridColumn: '1 / 5'}}>
                                    <MiniTextStack
                                        grayText="Figure 2"
                                        blackText="Fragments of a missing whole"
                                    />
                                </div>
                                <div style={{ gridColumn: '1 / 5', paddingTop: 'var(--gap)'}}>
                                    <AnimatedText 
                                        text="It is up to us to imagine the existence of something larger, even if its original shape can no longer be formed"
                                    />
                                </div>
                            </>,
                        },
                        {
                            children:
                            <> 
                                <div style={{ gridColumn: '1 / 6'}}>
                                    <MediaBlock image={FragmentRocksGroup} alt="2D Circular object" />
                                </div>
                            </>,
                        },
                    ]}
                />

                <SectionLayout>
                    <div style={{ gridColumn: '2 / 3'}}>
                        <LottieArrow rotation={0} size="6rem"/>
                    </div>
                </SectionLayout>

                <SectionLayoutStack
                    gap="2rem"
                    sections={[
                            {
                                children: 
                                <>
                                    <MobileHeaderStack
                                        gridColumn="1 / 5"
                                        number="3"
                                        name="Bone"
                                        text="An idea can begin simply, existing in a state where it does not need to fully explain itself or justify the direction it might eventually take. Over time, however, returning to that same idea introduces new interpretations, and what once felt settled begins to feel open again in ways that were not originally expected. What was once accepted as it was now quietly invites reconsideration."
                                    />
                                </>,
                            },
                            {
                                children: 
                                <>
                                    <div style={{ gridColumn: '1 / 5'}}>
                                        <MediaBlock 
                                            image={rock4_3} 
                                            alt="A bone-shaped stone" 
                                        />
                                    </div>
                                    
                                </>,
                            },
                        ]}
                />

                <SectionLayoutStack 
                    gap="3rem"
                    paddingBottom="0"
                    sections={[
                        {
                            children:
                            <>
                                <div style={{ gridColumn: '1 / 5'}}>
                                    <MiniTextStack
                                        grayText="Returning Ideas"
                                        blackText="Structure Never Changing"
                                    />
                                </div>
                                
                            </>
                        },
                        {
                            children:
                            <> 
                                <div style={{ gridColumn: '1 / 5'}}>
                                    <MediaBlock
                                        image={BoneRocksGroup} 
                                        alt="two photos of the bone-shaped rock" 
                                    />
                                </div>
                                
                            </>
                        },
                        {
                            children:
                            <>
                                <div style={{ gridColumn: '1 / 5'}}>
                                    <AnimatedText 
                                        text="With reconsideration comes the urge to strengthen the thinking behind it, to clarify what it means and
                                            shape it into something that feels more deliberate and complete. Each adjustment promises a clearer
                                            version of the same idea, yet every change also replaces the moment that existed before it. What began as 
                                            something simple slowly becomes layered with decisions that arrived later. Bone is what remains after other 
                                            layers have changed or disappeared, holding the shape that everything else once formed around."
                                    />
                                </div>
                            </>
                        },
                    ]}
                />

            </section>
        }

        sectionB={
            <section className="pageLayout">

                <SectionLayoutStack
                    gap="3rem"
                    sections={[
                        {
                            children:
                            <> 
                            <div style={{ gridColumn: '1 / 5'}}>
                                <SectionLayout paddingBottom="0">
                                    <div style={{ gridColumn: "1 / 3"}}>
                                        <MediaBlock image={chalk2_3Long} alt="A stone on a white background"/>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "var(--gap)", gridColumn: "3 / 5" }}>
                                        <MediaBlock image={chalk2_2} alt="A stone on a white background" />
                                        <MediaBlock image={chalk2_1} alt="A stone on a white background" />
                                    </div>
                                </SectionLayout>
                            </div>
                                
                            </>,
                        },
                        {
                            children: 
                            <>
                                <div style={{ gridColumn: '1 / 5'}}>
                                    <MiniTextStack
                                        grayText="A Loop"
                                        blackText="Repeating Again"
                                    />
                                </div>
                                <div style={{ gridColumn: '1 / 5', paddingTop: 'var(--gap)'}}>
                                    <AnimatedText 
                                        text="Remnants of what is incomplete, evidence of
                                            recurring ideas, offcuts and fragments of a missing
                                            whole."
                                    />
                                </div>
                            </>,
                        },
                        
                    ]}
                />

                <SectionLayoutStack 
                    gap="2rem"
                    sections={[
                        {
                            children:
                            <> 
                                <div style={{ gridColumn: '1 / 5'}}>
                                    <MediaBlock 
                                        image={ChalkLandscape2Mobile} 
                                        alt="White Chalk on a white background" 
                                    />
                                </div>
                                
                            </>
                        },
                        {
                            children:
                            <>
                                <div style={{ gridColumn: '1 / 5'}}>
                                    <AnimatedText 
                                        text="What remains visible at the end is rarely the struggle itself, 
                                            but the faint evidence that it happened at all, the subtle residue of 
                                            thinking and making that lingers long after the effort has passed. Those 
                                            traces, small and temporary as they are, often become the only guide forward, 
                                            suggesting where to reach next and inviting you to continue exploring what was built along the way."
                                        reverse={true}
                                    />
                                </div>
                            </>
                        },
                    ]}
                />

                <SectionLayoutStack 
                    gap="4.5rem"
                    sections={[
                        {
                            children:
                            <> 
                                <div style={{ gridColumn: '2 / 5'}}>
                                    <MediaBlock 
                                        image={chalk1} 
                                        alt="White Chalk on a white background" 
                                    />
                                </div>
                                
                            </>
                        },
                        {
                            children:
                            <>
                                <div style={{ gridColumn: '1 / 5'}}>
                                    <AnimatedText 
                                        text="Chalk, what remains after both movement and thought have searched for a hold."
                                        className="plarge"
                                        reverse={true}
                                        tilt={true}
                                    />
                                </div>
                            </>
                        },
                    ]}
                />

                <SectionLayoutStack 
                    gap="1.5rem"
                    paddingBottom="3rem"
                    sections={[
                        {
                            children:
                            <>
                                <div style={{ gridColumn: '1 / 5'}}>
                                    <MiniTextStack
                                        grayText="Climbing Up"
                                        blackText="The Reward for Effort"
                                    />
                                </div>
                                
                            </>
                        },
                        {
                            children:
                            <> 
                                <div style={{ gridColumn: '1 / 5'}}>
                                    <MediaBlock
                                        image={ChalkPortraitFirst} 
                                        alt="A piece of chalk"
                                    />
                                </div>
                                
                            </>
                        },
                        {
                            children:
                            <>
                                <div style={{ gridColumn: '1 / 5'}}>
                                    <AnimatedText 
                                        text="Does an idea become stronger through refinement, or simply becoming something different from the 
                                            moment it first appeared? The process continues either way, circling between the desire to improve what
                                            exists and the hesitation to move too far from where it began."
                                        reverse={true}
                                    />
                                </div>
                            </>
                        },
                    ]}
                />

                <MobileHeaderStack
                    gridColumn="1 / 5"
                    number="4"
                    name="Chalk"
                />
            </section>
        }

        bottomStripA={
            <SectionLayout minHeight="100svh" placeItems="end" paddingBottom="0">
                <div style={{ gridColumn: '1 / 5', display: 'flex', justifyContent: 'flex-end'}}>
                    <div className={styles.rockTriplet}>
                        <MediaBlock
                            image={RockTriplet}
                            alt="Three Rock Shapes"
                        />
                    </div>
                </div>
                <div style={{ gridColumn: '1 / 5', display: 'flex', alignItems: 'end'  }}>
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
    </main>
  );
}