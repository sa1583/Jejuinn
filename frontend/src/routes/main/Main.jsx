import { SectionsContainer, Section } from 'react-fullpage';
import MainOne from '../../components/main/MainOne';
import MainTwo from '../../components/main/MainTwo';
import MainThree from '../../components/main/MainThree';
import MainFour from '../../components/main/MainFour';

export default function Main() {
  let options = {
    anchors: ['sectionOne', 'sectionTwo', 'sectionThree', 'sectionFour'],
    navigation: false,
  };

  return (
    <SectionsContainer {...options}>
      <Section>
        <MainOne />
      </Section>
      <Section>
        <MainTwo />
      </Section>
      <Section>
        <MainThree />
      </Section>
      <Section>
        <MainFour />
      </Section>
    </SectionsContainer>
  );
}
