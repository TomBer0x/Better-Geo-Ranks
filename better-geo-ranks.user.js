// ==UserScript==
// @name         GeoGuessr Custom Ranks and UI (Visual Mod) v1.0
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds 9 new ranks to the game, replacing a generic Champion rank
// @downloadURL  https://github.com/TomBer0x/Better-Geo-Ranks/blob/main/better-geo-ranks.user.js
// @updateURL    https://github.com/TomBer0x/Better-Geo-Ranks/blob/main/better-geo-ranks.user.js
// @author       TomBer
// @match        https://www.geoguessr.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    // Only for testing purposes
    const FORCE_TEST_ELO = false;
    const THEMES = ['plat', 'emerald', 'gm', 'champ'];
    // bg = main colour, overlay = shine
    const RANK_CONFIGS = [
        { min: 2200, name: 'CHAMPION', prefix: 'champ', accent: '#e040fb', bg: 'linear-gradient(179deg, rgb(187, 68, 240) -3.95%, rgb(49, 0, 71) 95.2%)', overlay: 'linear-gradient(41deg, rgba(220, 50, 255, 0.2) 26.12%, rgba(120, 0, 180, 0.5) 91.55%)' },
        { min: 2000, name: 'GRANDMASTER', prefix: 'gm', accent: '#ffb300', bg: 'linear-gradient(179deg, rgb(171, 93, 31) -3.95%, rgb(0, 0, 0) 95.2%)', overlay: 'linear-gradient(41deg, rgba(255, 170, 50, 0.3) 26.12%, rgba(180, 80, 10, 0.55) 91.55%)' },
        { min: 1900, name: 'EMERALD I', prefix: 'emerald', accent: '#00ff73', bg: 'linear-gradient(179deg, rgb(0, 110, 45) -3.95%, rgb(0, 25, 10) 95.2%)', overlay: 'linear-gradient(41deg, rgba(0, 255, 100, 0.35) 26.12%, rgba(0, 50, 20, 0.4) 91.55%)' },
        { min: 1800, name: 'EMERALD II', prefix: 'emerald', accent: '#00ff73', bg: 'linear-gradient(179deg, rgb(0, 110, 45) -3.95%, rgb(0, 25, 10) 95.2%)', overlay: 'linear-gradient(41deg, rgba(0, 255, 100, 0.35) 26.12%, rgba(0, 50, 20, 0.4) 91.55%)' },
        { min: 1700, name: 'EMERALD III', prefix: 'emerald', accent: '#00ff73', bg: 'linear-gradient(179deg, rgb(0, 110, 45) -3.95%, rgb(0, 25, 10) 95.2%)', overlay: 'linear-gradient(41deg, rgba(0, 255, 100, 0.35) 26.12%, rgba(0, 50, 20, 0.4) 91.55%)' },
        { min: 1600, name: 'PLATINUM I', prefix: 'plat', accent: '#cce4ff', bg: 'linear-gradient(179deg, rgb(229, 228, 226) -3.95%, rgb(109, 129, 150) 95.2%)', overlay: 'linear-gradient(41deg, rgba(220, 225, 230, 0.16) 26.12%, rgba(140, 145, 155, 0.98) 91.55%)' },
        { min: 1500, name: 'PLATINUM II', prefix: 'plat', accent: '#cce4ff', bg: 'linear-gradient(179deg, rgb(229, 228, 226) -3.95%, rgb(109, 129, 150) 95.2%)', overlay: 'linear-gradient(41deg, rgba(220, 225, 230, 0.16) 26.12%, rgba(140, 145, 155, 0.98) 91.55%)' },
        { min: 1400, name: 'PLATINUM III', prefix: 'plat', accent: '#cce4ff', bg: 'linear-gradient(179deg, rgb(229, 228, 226) -3.95%, rgb(109, 129, 150) 95.2%)', overlay: 'linear-gradient(41deg, rgba(220, 225, 230, 0.16) 26.12%, rgba(140, 145, 155, 0.98) 91.55%)' },
        { min: 0, name: 'PLATINUM IV', prefix: 'plat', accent: '#cce4ff', bg: 'linear-gradient(179deg, rgb(229, 228, 226) -3.95%, rgb(109, 129, 150) 95.2%)', overlay: 'linear-gradient(41deg, rgba(220, 225, 230, 0.16) 26.12%, rgba(140, 145, 155, 0.98) 91.55%)' }
    ];

    GM_addStyle(`
        /* Theme properties */
        body.theme-plat { --bg-room: radial-gradient(circle at 100% -20%, rgba(200, 210, 220, 0.15) 0%, transparent 60%), radial-gradient(circle at 50% -60%, rgba(200, 210, 220, 0.15) 0%, transparent 65%), radial-gradient(farthest-corner at 0% -20%, #2c3e50 0%, transparent 50%), #121418; --bg-stripe: #ffffff; --ui-accent: #ffffff; --ui-faded: rgba(255, 255, 255, 0.15); }
        body.theme-emerald { --bg-room: radial-gradient(circle at 100% -20%, rgba(0, 255, 100, 0.2) 0%, transparent 60%), radial-gradient(circle at 50% -60%, rgba(0, 255, 100, 0.2) 0%, transparent 65%), radial-gradient(farthest-corner at 0% -20%, #003315 0%, transparent 50%), #000c05; --bg-stripe: #00ff64; --ui-accent: #00ff64; --ui-faded: rgba(0, 255, 100, 0.2); }
        body.theme-gm { --bg-room: radial-gradient(circle at 100% -20%, rgba(255, 150, 0, 0.2) 0%, transparent 60%), radial-gradient(circle at 50% -60%, rgba(255, 150, 0, 0.2) 0%, transparent 65%), radial-gradient(farthest-corner at 0% -20%, #4a1c00 0%, transparent 50%), #0f0500; --bg-stripe: #ff9600; --ui-accent: #ff9600; --ui-faded: rgba(255, 150, 0, 0.2); }
        body.theme-champ { --bg-room: radial-gradient(circle at 100% -20%, rgba(200, 50, 255, 0.2) 0%, transparent 60%), radial-gradient(circle at 50% -60%, rgba(200, 50, 255, 0.2) 0%, transparent 65%), radial-gradient(farthest-corner at 0% -20%, #30005a 0%, transparent 50%), #0d0014; --bg-stripe: #c832ff; --ui-accent: #c832ff; --ui-faded: rgba(200, 50, 255, 0.2); }
        body[class*="theme-"] [class*="ranked-duels_root"] { --ds-color-purple-100: var(--ui-accent) !important; --ds-color-purple-80: var(--ui-accent) !important; --ds-color-brand-70: var(--ui-accent) !important; }

        /* Rank effects and text tweaks */
        .plat-text-chrome { color: #ffffff !important; -webkit-text-stroke: 0.8px rgba(0, 0, 0, 0.7) !important; text-shadow: 0px 1px 0px #a0a5af, 0px 2px 0px #707582, 0px 3px 0px #404552, 0px 5px 6px rgba(0, 0, 0, 0.8), 0px 0px 12px rgba(255, 255, 255, 0.4) !important; font-weight: 950 !important; }
        .plat-subtext-chrome { text-shadow: 1px 1px 3px rgba(0,0,0,0.7), 0 0 5px #000 !important; }
        .plat-icon-chrome { filter: grayscale(1) brightness(1.1) contrast(1.3) drop-shadow(0px 10px 4px rgba(0, 0, 0, 0.8)) drop-shadow(0px 0px 10px rgba(255, 255, 255, 0.5)) !important; }
        .plat-pattern-dark { filter: brightness(1) !important; opacity: 0.4 !important; }
        .plat-banner { border-color: rgba(26, 25, 25, 0.4) !important; }
        .emerald-text-chrome { color: #ffffff !important; -webkit-text-stroke: 0.8px rgba(0, 0, 0, 0.7) !important; text-shadow: 0px 1px 0px #81c784, 0px 2px 0px #4caf50, 0px 3px 0px #2e7d32, 0px 5px 6px rgba(0, 0, 0, 0.7), 0px 0px 15px rgba(0, 230, 118, 0.6) !important; font-weight: 950 !important; }
        .emerald-icon-chrome { filter: hue-rotate(280deg) brightness(1.1) saturate(1.15) contrast(1.1) drop-shadow(0px 10px 4px rgba(0, 0, 0, 0.8)) drop-shadow(0px 0px 10px rgba(0, 255, 76, 0.5)) !important; }
        .emerald-pattern-dark { filter: hue-rotate(90deg) brightness(0.7) !important; opacity: 0.55 !important; }
        .emerald-banner { border-color: rgba(0, 41, 19, 0.4) !important; }
        .gm-text-chrome { color: #ffecb3 !important; -webkit-text-stroke: 0.8px rgba(60, 30, 0, 0.9) !important; text-shadow: 0px 1px 0px #ffca28, 0px 2px 0px #ff8f00, 0px 3px 0px #bf360c, 0px 5px 6px rgba(0, 0, 0, 0.8), 0px 0px 15px rgba(255, 193, 7, 0.4) !important; font-weight: 950 !important; letter-spacing: 0.5px !important; }
        .gm-icon-chrome { filter: sepia(1) hue-rotate(-30deg) saturate(4) brightness(1.1) drop-shadow(0px 10px 4px rgba(0, 0, 0, 0.6)) drop-shadow(0px 0px 15px rgba(255, 160, 0, 0.6)) !important; }
        .gm-pattern-dark { filter: sepia(1) hue-rotate(-30deg) saturate(2) brightness(0.2) !important; opacity: 0.6 !important; }
        .gm-banner { border-color: rgba(255, 193, 7, 0.4) !important; }
        .champ-text-chrome { color: #ffffff !important; -webkit-text-stroke: 0.8px rgba(40, 0, 80, 0.9) !important; text-shadow: 0px 1px 0px #b026ff, 0px 2px 0px #7b00cc, 0px 3px 0px #4a0080, 0px 5px 6px rgba(0, 0, 0, 0.8), 0px 0px 15px rgba(224, 64, 251, 0.6) !important; font-weight: 950 !important; letter-spacing: 0.5px !important; }
        .champ-icon-chrome { filter: hue-rotate(70deg) saturate(2) brightness(1.3) drop-shadow(0px 10px 4px rgba(0, 0, 0, 0.6)) drop-shadow(0px 0px 20px rgba(224, 64, 251, 0.8)) !important; }
        .champ-pattern-dark { filter: hue-rotate(280deg) brightness(0.8) !important; opacity: 0.8 !important; }
        .champ-banner { border-color: rgba(224, 64, 251, 0.4) !important; }
        div[class*="division-header_right"], button[class*="entry-point_root"] { border: none !important; box-shadow: none !important; outline: none !important; background: transparent !important; }
        img[class*="entry-point_image"] { border-width: 5px !important; border-style: solid !important; border-radius: 30px !important; box-shadow: none !important; background-color: transparent !important; }

        /* Global background mod */
        body[class*="theme-"] div[class*="background_wrapper"], body[class*="theme-"] div[class*="background_backgroundRankedSystem"], body[class*="theme-"] div[class*="background_background__"] { background: var(--bg-room) !important; }
        body[class*="theme-"] main[class*="version4_main"] { background: transparent !important; }
        body[class*="theme-"] svg[class*="background_pattern"] { fill: var(--bg-stripe) !important; opacity: 0.06 !important; }
        body[class*="theme-"] svg[class*="background_pattern"] path { fill: inherit !important; }

        /* Duels tab tweaks */
        body[class*="theme-"] [class*="ranked-duels_root"] [class*="game-modes_root"] { background: rgba(0, 0, 0, 0.65) !important; border-color: rgba(255, 255, 255, 0.1) !important; }
        body[class*="theme-"] [class*="ranked-duels_root"] [class*="game-modes_inner"] { box-shadow: none !important; }
        body[class*="theme-"] [class*="ranked-duels_root"] [class*="game-mode_gameModeCard"] { background: rgba(0, 0, 0, 0.3) !important; border: 1px solid rgba(255, 255, 255, 0.1) !important; box-shadow: none !important; }
        body[class*="theme-"] [class*="ranked-duels_root"] [class*="game-mode_gameModeCard"] [class*="game-mode_label"] { color: #d1d5db !important; }
        body[class*="theme-"] [class*="ranked-duels_root"] [class*="game-mode_selected"], body[class*="theme-"] [class*="ranked-duels_root"] [class*="game-mode_gameModeCard"]:hover { background: rgba(255, 255, 255, 0.1) !important; border-color: var(--ui-accent) !important; box-shadow: 0 0 10px var(--ui-faded), inset 0 0 8px var(--ui-faded) !important; }
        body[class*="theme-"] [class*="ranked-duels_root"] [class*="game-mode_selected"] [class*="game-mode_label"] { color: var(--ui-accent) !important; text-shadow: 0 0 5px var(--ui-faded) !important; }
        body[class*="theme-"] [class*="ranked-duels_root"] [class*="game-mode_root"]:not([class*="game-mode_selected"]) [class*="checkbox_variantPurple"] { background-color: rgba(0, 0, 0, 0.4) !important; border-color: rgba(255, 255, 255, 0.2) !important; }
        body[class*="theme-"] [class*="ranked-duels_root"] [class*="game-mode_selected"] img[alt="checkIcon"] { display: none !important; }
        body[class*="theme-"] [class*="ranked-duels_root"] [class*="game-mode_selected"] [class*="checkbox_mark"] { background-color: var(--ui-accent) !important; border-color: var(--ui-accent) !important; box-shadow: 0 0 8px var(--ui-faded) !important; background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>') !important; background-size: 80% !important; background-position: center !important; background-repeat: no-repeat !important; opacity: 1 !important; }
        body[class*="theme-"] [class*="ranked-duels_root"] [class*="toggle_toggle"]:checked { background-color: var(--ui-accent) !important; border-color: var(--ui-accent) !important; }
        body[class*="theme-"] [class*="ranked-duels_root"] [class*="toggle_toggle"]:checked::after { background-color: #121418 !important; }
        body[class*="theme-"] [class*="ranked-duels_root"] [class*="rolling-countdown_digitBox"] { background: transparent !important; border: none !important; box-shadow: none !important; }
        body[class*="theme-"] [class*="ranked-duels_root"] [class*="reset-countdown_container"] { background: rgba(0, 0, 0, 0.4) !important; border: 1px solid rgba(255,255,255,0.1) !important; border-radius: 8px !important; padding: 4px 10px !important; }
        body[class*="theme-"] [class*="ranked-duels_root"] [class*="row_root"] { background: rgba(0, 0, 0, 0.45) !important; border-color: rgba(255, 255, 255, 0.05) !important; transition: all 0.25s ease !important; }
        body[class*="theme-"] [class*="ranked-duels_root"] [class*="row_root"]:hover { background: rgba(255, 255, 255, 0.1) !important; }
        body[class*="theme-"] [class*="ranked-duels_root"] [class*="row_you"] { background: var(--ui-faded) !important; border-left: 4px solid var(--ui-accent) !important; }
        body[class*="theme-"] [class*="ranked-duels_root"] [class*="button_variantPrimary"] { background: var(--ui-faded) !important; border: 1px solid var(--ui-faded) !important; box-shadow: none !important; transition: all 0.25s ease !important; }
        body[class*="theme-"] [class*="ranked-duels_root"] [class*="button_variantPrimary"]:hover { background: color-mix(in srgb, var(--ui-accent) 40%, transparent) !important; border-color: var(--ui-accent) !important; }
        body[class*="theme-"] [class*="ranked-duels_root"] [class*="button_variantPrimary"] [class*="button_label"] { color: #ffffff !important; -webkit-text-stroke: 0 !important; text-shadow: 1px 1px 4px rgba(0,0,0,0.8) !important; letter-spacing: 1px !important; }
    `);

    const getConfig = (elo) => RANK_CONFIGS.find(r => elo >= r.min);
    const updateRankClass = (rate, suffix, activePrefix) => {
        if (!rate) return;
        const targetClass = `${activePrefix}-${suffix}`;
        if (!rate.classList.contains(targetClass)) {
            THEMES.forEach(theme => rate.classList.remove(`${theme}-${suffix}`));
            rate.classList.add(targetClass);
        }
    };

    const bgChange = (rate, bgString) => {
        if (rate && rate.dataset.modBg !== bgString) {
            rate.style.background = bgString;
            rate.dataset.modBg = bgString;
        }
    };

    const updateColour = (rate, hexColor) => {
        if (rate && rate.dataset.modColor !== hexColor) {
            rate.style.color = hexColor;
            rate.dataset.modColor = hexColor;
        }
    };

    const clearBodyTheme = () => {
        THEMES.forEach(theme => document.body.classList.remove(`theme-${theme}`));
        document.body.classList.remove('theme-diamond');
    };

    let isUpdating = false;


    function duelTweak() {
        if (isUpdating) return;
        isUpdating = true;
        const isProfilePage = window.location.pathname.includes('/user/') || window.location.pathname.includes('/me');
        let profileScope = document;
        if (isProfilePage) {
            const widgets = document.querySelectorAll('div[class*="widget_root"]');
            for (let widget of widgets) {
                const heading = widget.querySelector('h2');
                if (heading && heading.innerText.includes('Ranked Duels')) {
                    profileScope = widget;
                    break;
                }
            }
        }
        const title = document.querySelector('div[class*="division-header_title"]') || profileScope.querySelector('div[class*="widget_divisionText"] label');
        const rating = document.querySelector('div[class*="division-header_rating"]') || profileScope.querySelector('div[class*="widget_divisionValue"]');
        const icon = document.querySelector('img[class*="division-header_badge"]') || profileScope.querySelector('img[class*="widget_bottomRightSunkenIcon"]');
        const bgLayer = document.querySelector('div[class*="division-header_background"]');
        const patternLayer = document.querySelector('div[class*="division-header_pattern"]');
        const overlay = document.querySelector('div[class*="division-header_overlay"]');
        const rankLabel = document.querySelector('div[class*="division-header_rank"]');
        const seasonsBanner = document.querySelector('img[class*="entry-point_image"]');
        const profileCard = profileScope.querySelector('div[class*="widget_bottomRightSunken"]');

        if (!rating || !title) {isUpdating = false;
            return;}

        let eloText = rating.innerText || '';
        if (isProfilePage) {const currentRating1 = profileScope.querySelector('div[class*="widget_divisionValue"] strong');
            if (currentRating1) eloText = currentRating1.innerText;
        } else {clearBodyTheme();}

        const elo = typeof FORCE_TEST_ELO === 'number' ? FORCE_TEST_ELO : parseInt(eloText.replace(/\D/g, ''));
        const isRealChampion = icon && icon.src && icon.src.toLowerCase().includes('champion');
        if (!isRealChampion && FORCE_TEST_ELO === false) {
            if (!isProfilePage) clearBodyTheme();
            isUpdating = false;
            return;
        }

        const config = getConfig(elo);
        if (config) {
            const { prefix, bg, overlay: overlayBg, accent, name } = config;
            if (!isProfilePage) {
                const targetTheme = `theme-${prefix}`;
                if (!document.body.classList.contains(targetTheme)) {
                    clearBodyTheme();
                    document.body.classList.add(targetTheme);
                }
            }
            bgChange(bgLayer, bg);
            bgChange(overlay, overlayBg);
            if (profileCard && isProfilePage) {bgChange(profileCard, bg.replace(/rgb\(([^)]+)\)/g, 'rgba($1, 0.2)'));}
            if (title.innerText !== name) title.innerText = name;
            updateRankClass(title, 'text-chrome', prefix);
            if (!isProfilePage) {if (!rating.classList.contains('plat-subtext-chrome')) rating.classList.add('plat-subtext-chrome');
                updateColour(rating, '');
                if (rankLabel) {if (!rankLabel.classList.contains('plat-subtext-chrome')) rankLabel.classList.add('plat-subtext-chrome');
                    rankLabel.querySelectorAll('div').forEach(d => updateColour(d, '#ffffff'));}
            } else {profileScope.querySelectorAll('div[class*="widget_divisionValue"]').forEach(stat => {
                    if (!stat.classList.contains('plat-subtext-chrome')) stat.classList.add('plat-subtext-chrome');
                    stat.querySelectorAll('span').forEach(textNode => updateColour(textNode, '#ffffff'));
                    stat.querySelectorAll('strong').forEach(textNode => updateColour(textNode, accent));});
            }
            updateRankClass(icon, 'icon-chrome', prefix);
            updateRankClass(patternLayer, 'pattern-dark', prefix);
            updateRankClass(seasonsBanner, 'banner', prefix);
        }
        isUpdating = false;
    }

    const observer = new MutationObserver(() => {
        observer.disconnect();
        duelTweak();
        observer.observe(document.body, { childList: true, subtree: true });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    duelTweak();
})();
