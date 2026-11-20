export const BACKGROUND_URL =
  'https://cdn.magicpatterns.com/patterns/generated-images/fd39d66f-16d3-42fb-82f4-3394112beed8.jpg'

/** The supplied brand artwork; the logo is cropped out of its left half. */
export const LOGO_SHEET_URL = 'https://cdn.magicpatterns.com/uploads/hSnu8BLVVAa88Zwgxetptk/image.png'

export const CONTACT = {
  firstName: 'Jatin',
  middleName: 'Kanubhai',
  lastName: 'Shah',
  fullName: 'Jatin Kanubhai Shah',
  company: 'Siddhi Vinayak Realtors',
  phoneDisplay: '+91 92279 05111',
  phoneE164: '+919227905111',
  email: 'jatin_shah5151@yahoo.com',
  street: 'Rander Road',
  city: 'Surat',
  region: 'Gujarat',
  postcode: '395009',
  country: 'India',
  addressShort: 'Rander Road, Surat – 395009, Gujarat',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rander+Road%2C+Surat%2C+Gujarat+395009%2C+India',
}

/** vCard 3.0 — the version both iOS Contacts and Android Contacts import cleanly. */
export function buildVcf() {
  const c = CONTACT
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${c.lastName};${c.firstName};${c.middleName};;`,
    `FN:${c.fullName}`,
    `ORG:${c.company}`,
    `TEL;TYPE=CELL,VOICE:${c.phoneE164}`,
    `EMAIL;TYPE=INTERNET,WORK:${c.email}`,
    `ADR;TYPE=WORK:;;${c.street};${c.city};${c.region};${c.postcode};${c.country}`,
    `LABEL;TYPE=WORK:${c.street}\\, ${c.city} - ${c.postcode}\\, ${c.region}\\, ${c.country}`,
    'NOTE:Real estate – Property Leasing\\, Buying & Selling\\, Resale. 33 years experience.',
    'END:VCARD',
  ]
  return lines.join('\r\n') + '\r\n'
}

export function downloadVcf() {
  const vcf = buildVcf()
  const fileName = 'Jatin-Kanubhai-Shah.vcf'
  const blob = new Blob([vcf], { type: 'text/vcard;charset=utf-8' })
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

  if (isIOS) {
    // iOS Safari opens a vCard data URL straight into the "Create New Contact" sheet.
    window.location.href = `data:text/vcard;charset=utf-8,${encodeURIComponent(vcf)}`
    return
  }

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 4000)
}
