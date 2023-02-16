import { SectionsContainer, Section } from 'react-fullpage';
import MainTwo from '../../components/main/MainTwo';
import MainThree from '../../components/main/MainThree';
import MainFour from '../../components/main/MainFour';
import MainFive from '../../components/main/MainFive';

export default function Main() {
  let options = {
    anchors: ['sectionOne', 'sectionTwo', 'sectionThree', 'sectionFour'],
    navigation: false,
  };

  return (
    <SectionsContainer {...options}>
      {/* <Section>
        <MainOne />
      </Section> */}
      <Section>
        <MainTwo />
      </Section>
      <Section>
        <MainThree />
      </Section>
      <Section>
        <MainFour />
      </Section>
      <Section>
        <MainFive />
      </Section>
    </SectionsContainer>
  );
}
