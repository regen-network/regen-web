export default function isAdmin(user: any): boolean {
  return user &&
    user['https://regen-registry.com/roles'] &&
    user['https://regen-registry.com/roles'].indexOf('admin') > -1;
}
