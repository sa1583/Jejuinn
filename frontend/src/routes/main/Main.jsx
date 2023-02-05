import { SectionsContainer, Section } from 'react-fullpage';
import MainOne from '../../components/main/MainOne';

export default function Main() {
  let options = {
    anchors: ['sectionOne', 'sectionTwo', 'sectionThree'],
    navigation: false,
  };

  return (
    <SectionsContainer {...options} style={{ paddingTop: '80' }}>
      <Section>
        <MainOne />
      </Section>
      <Section>
        <p>소개 페이지</p>
      </Section>
      <Section>
        <p>테마 및 기능 설명</p>
      </Section>
    </SectionsContainer>
  );
}
