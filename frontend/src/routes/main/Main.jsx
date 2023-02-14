import { SectionsContainer, Section } from 'react-fullpage';
import MainOne from '../../components/main/MainOne';
import MainTwo from '../../components/main/MainTwo';
import MainThree from '../../components/main/MainThree';
import MainFour from '../../components/main/MainFour';
import MainFive from '../../components/main/MainFive';
import MainSix from '../../components/main/MainSix';

export default function Main() {
  let options = {
    anchors: [
      'sectionOne',
      'sectionTwo',
      'sectionThree',
      'sectionFour',
      'sectionFive',
    ],
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
      <Section>
        <MainSix />
      </Section>
    </SectionsContainer>
  );
}
