import styles from "./styles/page.module.css";
import Image from "next/image";
import rock1 from "/public/images/LandscapeRock1.png"
import rock2vert from "/public/images/Rock3-2.png"
import rock2vert2 from "/public/images/Rock3-3.png"
import rock3vert1 from "/public/images/Rock4-3.png"
import rock3vert2 from "/public/images/Rock4-2.png"
import rock3 from "/public/images/LandscapeRock3-1.webp"
import MediaBlock from "./components/molecules/mediaBlock/MediaBlock";
import TwoColumn from "./components/molecules/twoColumn/TwoColumn";
import GridLayout from "./components/molecules/gridLayout/gridLayout";
import ScrollSwap from "./components/atoms/scrollswap/ScrollSwap";

export default function Home() {
  return (
    <>
    <ScrollSwap
      chapters={[
        {
          id: 'hero',
          node: (
            <section style={{ minHeight: '120svh', display: 'grid', placeItems: 'center' }}>
              <h1>Hero A</h1>
            </section>
          ),
        },
        {
          id: 'next',
          node: (
            <section style={{ minHeight: '120svh', display: 'grid', placeItems: 'center' }}>
              <h1>Section B</h1>
            </section>
          ),
        },
      ]}
      // prompt="scroll up" // customize if you like
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
