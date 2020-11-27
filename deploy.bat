git add --a
git commit -m "upload blog"
git push

call npm run build
cd public
git init
git add -A
git commit -m "deploy"
git push -f git@175.24.53.169:~/project.git master
