import app from './app';
import { initializeDatabase } from './prisma';

(async () => {
  try {
    await initializeDatabase();
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Startup error:', err);
    process.exit(1);
  }
})();