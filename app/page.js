import styles from "./styles/page.module.css";
import Image from "next/image";
import rock1 from "/public/images/LandscapeRock1.jpg"
import rock3vert from "/public/images/Rock3-2.png"
import rock3vert2 from "/public/images/Rock3-3.png"
import MediaBlock from "./components/molecules/mediaBlock/MediaBlock";
import TwoColumn from "./components/molecules/twoColumn/TwoColumn";

export default function Home() {
  return (
    <>
      <main className="pageLayout">
        <div className={styles.heroContainer}>
          <h1 className={styles.title}>Offcut</h1>
        </div>
        
        <Image 
          src={rock1}
          className={styles.media}
        />

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
                  <MediaBlock image={rock3vert2} alt="A stone on a white background" fit="height"/>
                </div>
                
              }

            />
          }
          right={
            <MediaBlock image={rock3vert} alt="A stone on a white background"/>
          }
        />
      
      </main>
    </>
  );
}
