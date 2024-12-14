window.onload = async function () {
    // Step 1: 初始化 MindAR.js
    const mindARThree = new window.MindARThree({
        container: document.querySelector("#ar-container"),
        imageTargetSrc: "./mindar-image.mind", // 图像目标文件
    });

    const { renderer, scene, camera } = mindARThree;

    // Step 2: Unity WebGL 的启动逻辑
    function startUnity() {
        const unityInstance = UnityLoader.instantiate(
            "unity-canvas", // Canvas 元素 ID
            "./unity-build/Build/UnityGame.json", // Unity WebGL 配置文件
            {
                onProgress: (instance, progress) => {
                    console.log(`Unity 加载进度: ${Math.round(progress * 100)}%`);
                },
            }
        );
    }

    // Step 3: 图像目标检测成功后启动 Unity WebGL
    mindARThree.addEventListener("targetFound", () => {
        console.log("图像目标检测成功，启动 Unity");
        startUnity();
    });

    // 启动 MindAR 摄像头与检测功能
    await mindARThree.start();

    // 设置渲染循环
    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });
};
