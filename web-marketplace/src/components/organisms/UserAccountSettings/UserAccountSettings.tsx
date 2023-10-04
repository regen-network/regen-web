import {Title, Subtitle, Body, Label} from 'web-components/lib/components/typography';
import ContainedButton from "web-components/lib/components/buttons/ContainedButton";

export const UserAccountSettings = () => {
  return <div>
    <ConnectField />
  </div>
  // typography
  // contained button
  // text button
  // components/new/TextField
}

const ConnectField = () => {
  return <div className="flex flex-row">
    <div>Google</div>
    <ContainedButton>Connect</ContainedButton>
  </div>
}
