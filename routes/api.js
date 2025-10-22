const express = require('express');
const playerDataService = require('../services/playerDataService');
const pokedexService = require('../services/pokedexService');
const { isAuthenticated } = require('./auth');

const router = express.Router();

router.get('/rankings', async (req, res) => {
    try {
        const rankings = await playerDataService.getRankings();
        res.json(rankings);
    } catch (error) {
        console.error("Error in /api/rankings:", error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/public-data', async (req, res) => {
    try {
        const playerSummaries = await playerDataService.getPublicPlayerSummaries();
        res.json(playerSummaries);
    } catch (error) {
        console.error("Error in /api/public-data:", error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/player-detail/:publicId', async (req, res) => {
    try {
        const { publicId } = req.params;
        const playerId = await playerDataService.getPlayerIdFromPublicId(publicId);
        if (!playerId) {
            return res.status(404).json({ message: 'Player not found.' });
        }
        const playerDetail = await playerDataService.getPlayerDetail(playerId);
        res.json(playerDetail);
    } catch (error) {
        console.error("Error in /api/player-detail:", error);
        res.status(404).json({ message: error.message });
    }
});

router.post('/save-data', express.json({ limit: '10mb' }), async (req, res) => {
    try {
        const result = await playerDataService.savePlayerData(req.body);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in /api/save-data:", error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/private-data', isAuthenticated, async (req, res) => {
    try {
        const { playerId } = req.session.user;
        const privateData = await playerDataService.getPrivatePlayerData(playerId);
        res.json(privateData);
    } catch (error) {
        console.error("❌ [500 Server Error] in /api/private-data:", error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/check-auth-status', async (req, res) => {
    if (req.session.user) {
        try {
            const privateData = await playerDataService.getPrivatePlayerData(req.session.user.playerId);
            const team = privateData?.playerData?.account?.team;
            res.json({ loggedIn: true, username: req.session.user.username, team: team });
        } catch (error) {
            console.error("Error fetching private data for auth status check:", error);
            res.json({ loggedIn: true, username: req.session.user.username, team: null }); // Return logged in but no team on error
        }
    } else {
        res.json({ loggedIn: false });
    }
});

module.exports = router;
