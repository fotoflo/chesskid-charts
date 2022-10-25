NextJS tool to visual ChessKid game data

Login to chess kid and then your game data from  https://www.chesskid.com/callback/users/{username}/game-history?&limit=10000

Note to self: My son's username is Dionz (case sensitive)

Paste the data into sampleData/fullData.json

How to use it:

1. clone the repository
2. cd into the directory and type `npm install`
3. Turn on your MySQL DB (I use MAMP)
4. run `npm run dev`
5. open your browser to https://localhost:3000/rating

# errors 
Error: Error serializing `.context.req` returned from `getServerSideProps` in "/".

Did you start the database?
