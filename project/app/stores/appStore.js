const createAppStore = () => ({
  isFlippable: false,
  memberInfo: undefined,
  setIsFlippable(value = false) {
    this.isFlippable = value;
  },
  setMemberInfo(value) {
    this.memberInfo = value;
  },
  toggleIsFlippable() {
    this.isFlippable = !this.isFlippable;
  },
  get memberName() {
    return this.memberInfo && this.memberInfo.name;
  },
});

export default createAppStore;
