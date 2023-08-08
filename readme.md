git init <- Creates a new repo
git status <- View the changes to your project code
git add <- Add files to staging area
git commit -m "test commit" <- Creates a new commit
git log <- View Recent Commits


echo "# Expensify" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:jjhama/Expensify.git
git push -u origin main


git remote add origin git@github.com:jjhama/Expensify.git
git branch -M main
git push -u origin main