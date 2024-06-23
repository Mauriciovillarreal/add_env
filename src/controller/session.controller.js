const passport = require('passport')
const usersModel = require('../service/index.js')

class SessionController {
    githubAuth = passport.authenticate('github', { scope: 'user:email' }, async (req, res) => { })

    githubCallback = (req, res, next) => {
        passport.authenticate('github', { failureRedirect: '/login' }, (err, user) => {
            if (err) {
                console.error(err)
                return res.status(500).json({ message: 'Authentication error' })
            }
            if (!user) {
                return res.redirect('/login')
            }
            req.logIn(user, (err) => {
                if (err) {
                    console.error(err)
                    return res.status(500).json({ message: 'Login error' })
                }
                req.session.user = user
                return res.redirect('/')
            })
        })(req, res, next)
    }
    

    getCurrentUser = async (req, res) => {
        try {
            const user = await usersModel.findById(req.session.user._id)
            res.json(user)
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Error al obtener el usuario actual' })
        }
    }

    login = (req, res, next) => {
        passport.authenticate('login', (error, user, info) => {
            if (error) {
                return next(error)
            }
            if (!user) {
                req.session.error = 'Email or password incorrect'
                return res.redirect('/login')
            }
            req.logIn(user, (error) => {
                if (error) {
                    return next(error)
                }
                return res.redirect('/')
            })
        })(req, res, next)
    }

    register = (req, res, next) => {
        passport.authenticate('register', (error, user, info) => {
            if (error) {
                return next(error)
            }
            if (!user) {
                req.session.error = 'Error registering user'
                return res.redirect('/register')
            }
            req.logIn(user, (error) => {
                if (error) {
                    return next(error)
                }
                return res.redirect('/login')
            })
        })(req, res, next)
    }

    logout = (req, res) => {
        req.session.destroy(error => {
            if (error) return res.send({ status: 'error', error: error })
            else return res.redirect("/login")
        })
    }
}

module.exports = new SessionController()
