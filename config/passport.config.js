const passport = require("passport");
const { app } = require("../app");
const { getUserById, findByEmail } = require("../queries/users.queries");

const LocalStrategy = require("passport-local").Strategy;

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        //Vérifier à l'aide des queries si le user existe (email)
        const user = await findByEmail(email);
        if (user) {
          // Vérifier que le user qui existe a aussi le meme password que celui entré par le user .
          const match = await user.comparePassword(password);

          if (match) {
            //l'authentification dois fonctionner et laisser le User passe
            done(null, user);
          } else {
            done(null, false, { message: "Wrong email or password " });
          }
        } else {
          done(null, false, { message: "Wrong email or password" });
        }
      } catch (error) {
        done(error, null);
      }

      //Objectif Final
    }
  )
);
