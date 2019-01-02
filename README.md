# nodeFileSync
Node script to sync one file across multiple computers
Needed to keep one master database that users access to make changes and then export that one to four other computers.
Used fs to accomplish with node. Wrote a batch script to execute nightly. If any changes occur to master file then a back up will be made of the old file and then the file will be over-written on the other computers.
Edit the file paths to use.
