export default function getApiUri(): string {
  return process.env.REACT_APP_API_URI || 'http://localhost:5000';
}
