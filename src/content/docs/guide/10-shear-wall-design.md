---
title: ผลออกแบบผนังรับแรง (Shear Wall Design Results)
description: อ่านผลออกแบบผนัง แปลงค่าเหล็กเป็นเส้นจริง และ Coupling Beam
sidebar:
  order: 10
---

## ก่อนเริ่ม

> [!IMPORTANT]
> บทนี้ต้อง **Run Analysis (บทที่ 8)** และ **Run Design (บทที่ 9)** ให้เสร็จก่อน! ผนังต้องมี Pier/Spandrel Label ที่กำหนดไว้ในบทที่ 5 ด้วยครับ

---

## ✍️ Tutorial: อ่านผลออกแบบผนังรับแรง

### ขั้นที่ 1: Run Shear Wall Design

1.  ไปที่ **Design > Shear Wall Design > Start Design/Check...**
2.  เลือก Design Code: `ACI 318-19` (หรือ `ACI 318-14`)
3.  กด **OK** -> รอสักพัก

### ขั้นที่ 2: อ่านผลออกแบบ

1.  ไปที่ **Design > Shear Wall Design > Display Design Info...**
2.  เลือก **Pier** ที่ต้องการดู (เช่น P1)
3.  ข้อมูลที่ได้:

| ค่า                            | ความหมาย            | ตัวอย่าง   |
| ------------------------------ | ------------------- | ---------- |
| **Required Vertical Rebar**    | เหล็กแนวตั้ง (As)   | 45.2 cm²   |
| **Required Horizontal Rebar**  | เหล็กแนวนอน (Ash)   | 12.8 cm²/m |
| **Shear Capacity**             | กำลังรับแรงเฉือน    | ✅ OK      |
| **Boundary Element Required?** | ต้องเสริมขอบหรือไม่ | Yes/No     |

### ขั้นที่ 3: แปลงค่าเหล็กเป็นเส้นจริง

```
ตัวอย่าง Pier P1 (ผนังยาว 6.00 m, หนา 0.30 m):

เหล็กแนวตั้ง (Vertical):
- Required As = 45.2 cm²
- ใช้ DB16 (As = 2.01 cm²/เส้น)
- จำนวน = 45.2 / 2.01 = 22.5 → ใช้ 24 เส้น (12 เส้น/หน้า)
- ระยะเรียง = 6000 / 12 = 500 mm → DB16 @500 mm EF (Each Face)

เหล็กแนวนอน (Horizontal):
- Required Ash = 12.8 cm²/m
- ใช้ DB12 (As = 1.13 cm²/เส้น)
- จำนวน/m = 12.8 / (1.13 × 2) = 5.66 → 6 เส้น/m
- ระยะเรียง = 1000/6 = 167 mm → DB12 @150 mm EF
```

> [!IMPORTANT]
> **Boundary Element (บริเวณปลายผนัง):** ถ้า ETABS บอกว่า "Boundary Element Required = Yes" ต้องเพิ่มเหล็กเสริมที่ปลายผนัง (คล้ายเหล็กเสา) ยาวประมาณ 15-20% ของความยาวผนังครับ

---

## Coupling Beam (คานเชื่อมผนัง)

คานเชื่อมเป็นจุดที่ **เสียหายก่อน** ในแผ่นดินไหว (Ductile Fuse) ต้องออกแบบอย่างระวัง:

### ดูผลออกแบบ

1.  **Design > Shear Wall Design > Display Design Info...**
2.  เลือก **Spandrel** (เช่น SP1)
3.  ค่าที่ได้:
    - **Top Rebar:** เหล็กบน (cm²)
    - **Bottom Rebar:** เหล็กล่าง (cm²)
    - **Shear Rebar:** เหล็กปลอก (cm²/m)

### เกณฑ์พิเศษ

| สัดส่วน ln/h | ประเภท        | การเสริมเหล็ก                                          |
| ------------ | ------------- | ------------------------------------------------------ |
| ln/h ≥ 4     | คานทั่วไป     | เสริมแบบคานปกติ                                        |
| 2 ≤ ln/h < 4 | คานเชื่อมกลาง | เสริมทแยง (Diagonal) ตาม ACI 18.10.7                   |
| ln/h < 2     | คานเชื่อมสั้น | **ต้องใช้เหล็กทแยง** (Diagonal Reinforcement) เท่านั้น |

> [!WARNING]
> **Coupling Beam สั้น (ln/h < 2):** ต้องใช้เหล็กทแยง (Diagonal) เท่านั้น! ถ้าเสริมแบบคานธรรมดาจะเปราะ (Brittle) อันตรายมากในแผ่นดินไหว
