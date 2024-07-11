### 1./ Tạo branch step1
git branch "step1"
### 2./ Chuyển sang step1
git checkout "step1"
### 3./ Thêm file
git add.
### 4./commit commend
git commit -m "tạo branch step1"
### 5./ push origin lên step1
git push origin "step1"

(git push)

### 6./ Kiểm tra trạng thái
git status
PS C:\myworking\test\select2\component_select> git status
On branch step1
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        git_note_step1.md

nothing added to commit but untracked files present (use "git add" to track)

# THêm file note
git add .
git commit -m "them file git note"
[step1 d776f6a] them file git note
 1 file changed, 22 insertions(+)
 create mode 100644 git_note_step1.md
git push --set-upstream origin step1
Enumerating objects: 4, done.
Counting objects: 100% (4/4), done.
Delta compression using up to 4 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 629 bytes | 629.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
To https://github.com/vovinhloc/component_select
   fbb8924..d776f6a  step1 -> step1
branch 'step1' set up to track 'origin/step1'.

git push
Everything up-to-date


## Final
git add .
git push
Everything up-to-date

