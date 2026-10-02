import { useCallback, useState } from "react";
import { SvgDefs } from "./components/Art";
import { Dust, Music, Nav } from "./components/Chrome";
import Opening from "./components/Opening";
import Letter from "./components/Letter";
import Desk from "./components/Desk";
import SmallThings from "./components/SmallThings";
import AfterYou from "./components/AfterYou";
import Pinky from "./components/Pinky";
import World from "./components/World";
import Future from "./components/Future";
import Agreement from "./components/Agreement";
import LoveLetter from "./components/LoveLetter";
import Bouquet from "./components/Bouquet";

export default function App() {
  const [opened, setOpened] = useState(false);

  const handleOpened = useCallback(() => {
    setOpened(true);
    window.setTimeout(() => document.getElementById("letter")?.scrollIntoView({ behavior: "smooth", block: "start" }), 40);
  }, []);

  return (
    <>
      <SvgDefs />
      <Dust />
      <Music />
      <Nav visible={opened} />
      <main>
        <Opening onOpened={handleOpened} opened={opened} />
        {opened && (
          <>
            <Letter />
            <Desk />
            <SmallThings />
            <AfterYou />
            <Pinky />
            <World />
            <Future />
            <Agreement />
            <LoveLetter />
            <Bouquet />
          </>
        )}
      </main>
    </>
  );
}
