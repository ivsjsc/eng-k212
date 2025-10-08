## CI/CD Strategy

- Auto build: OFF  
- Deploy: Manual only  
- Branches:
  - `dev`: development only  
  - `staging`: pre-deploy testing  
  - `main`: production release

To deploy:
1. Unlock deploy in Netlify/Vercel
2. Merge into `main`
3. Trigger manual build
4. Lock deploy again
