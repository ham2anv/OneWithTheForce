export default function readTime(target) {
  return Math.floor(target?.textContent.split(/\b/g).length/250)
}