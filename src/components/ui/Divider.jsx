export default function Divider({ ornate = false }) {
  return <hr className={ornate ? 'divider divider--ornate' : 'divider'} />
}
