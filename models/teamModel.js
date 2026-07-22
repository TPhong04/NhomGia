const teamMembers = [
  {
    name: 'Trần Thế Đình',
    age: 21,
    gender: 'Nam',
    birthday: '28/06/2005',
    mssv: '2306022032',
    class: '17THC',
    address: 'TP.HCM',
    avatar: '/img/thedinh.jpg',
  },
  {
    name: 'Dương Thanh Phong',
    age: 22,
    gender: 'Nam',
    birthday: '20/12/2004',
    mssv: '2306022002',
    class: '17THC',
    address: 'Cần Thơ',
    avatar: '/img/thanhphong.jpg',
  },
  {
    name: 'Phan Thị Thanh Hoài',
    age: 21,
    gender: 'Nữ',
    birthday: '26/11/2005',
    mssv: '2306012019',
    class: '17THC',
    address: 'Đắk Lắk',
    avatar: '/img/thanhhoai.jpg',
  },
];

function getAllMembers() {
  return teamMembers;
}

function searchMembers(query) {
  if (!query) {
    return [];
  }

  const normalizedQuery = query.toLowerCase();

  return teamMembers.filter((member) =>
    member.name.toLowerCase().includes(normalizedQuery) ||
    member.mssv.includes(query) ||
    member.class.toLowerCase().includes(normalizedQuery) ||
    member.address.toLowerCase().includes(normalizedQuery)
  );
}

module.exports = {
  getAllMembers,
  searchMembers,
};
