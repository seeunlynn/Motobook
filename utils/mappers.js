window.mapProfileToUI = (dbProfile) => ({
  id: dbProfile.id,
  handle: dbProfile.handle,
  name: dbProfile.profile_title,
  icon: dbProfile.profile_image_url,
  catchphrase: dbProfile.profile_slogan,
  intro: dbProfile.profile_marketing_copy,
  createdAt: dbProfile.created_at,
  category: dbProfile.category,
  links: dbProfile.links ? dbProfile.links.map(mapLinkToUI) : [],
});

window.mapLinkToUI = (dbLink) => ({
  id: dbLink.id,
  name: dbLink.link_title,
  url: dbLink.link,
  icon: dbLink.link_image_url,
});

window.mapProfileToDB = (uiProfile) => ({
  handle: uiProfile.handle,
  profile_title: uiProfile.name,
  profile_image_url: uiProfile.icon,
  profile_slogan: uiProfile.catchphrase,
  profile_marketing_copy: uiProfile.intro,
  category: uiProfile.category,
});

window.mapLinkToDB = (uiLink, profileId) => ({
  profile_id: profileId,
  link_title: uiLink.name,
  link: uiLink.link,
  link_image_url: uiLink.icon,
});