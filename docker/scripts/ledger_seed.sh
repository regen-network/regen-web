#!/bin/bash

regen config chain-id regen-local
regen config keyring-backend test

# add user account
printf "cool trust waste core unusual report duck amazing fault juice wish century across ghost cigar diary correct draw glimpse face crush rapid quit equip\n\n" | regen keys --keyring-backend test add local -i

# create credit classes using latest state from mainnet
regen tx ecocredit create-class regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk C regen:13toVgXF5JhEC5AxpRPiBckgKpVuxah9MgTSzuTbUmyKiLZvJgU3tee.rdf --class-fee 20000000uregen --from local --yes
sleep 6
regen tx ecocredit create-class regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk C regen:13toVh7ATQB24tvEHgZPYhMutzAoYF4MgPq19Cjr6TnWBxmNeBeARj2.rdf --class-fee 20000000uregen --from local --yes
sleep 6
regen tx ecocredit create-class regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk C regen:13toVgLqqFAjByA2kZkDFq7PZB2HUyD3u8qFDiBidYjpdYBLeJvAzxB.rdf --class-fee 20000000uregen --from local --yes
sleep 6
regen tx ecocredit create-class regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk C regen:13toVgBisQqEmauHntQsW6mwpz71RSTwsjzhn9gxCQ16tdRjHPHTRoK.rdf --class-fee 20000000uregen --from local --yes
sleep 6

# create projects using latest state from mainnet
regen tx ecocredit create-project C01 "CD-MN" regen:13toVgGCN3gvRbWFkvYxfZUHrsFsribCKiGfFxW4mchJWsjEYdFaYd4.rdf --reference-id VCS-934 --from local --yes
sleep 6
regen tx ecocredit create-project C01 "KE" regen:13toVgoZxism9hBjsmFGuAXxj6uv5WrXHPRUTR33G3Eewp9567K5PU7.rdf --reference-id VCS-612 --from local --yes
sleep 6
regen tx ecocredit create-project C01 "PE-MDD" regen:13toVggnVfBxDbJ47V5ZUdwB3gWd6avSGVQGKk4rDx4o9kbjvKj6G13.rdf --reference-id VCS-1218 --from local --yes
sleep 6
regen tx ecocredit create-project C02 "US-WA" regen:13toVhmNbuUMgxxzAenxV1rkQHPrhXyuN3PyaQxsfCrxCn2i9G9niWM.rdf --reference-id CFC-1.2018 --from local --yes
sleep 6
regen tx ecocredit create-project C02 "US-OH" regen:13toVgCCjzpdUF8ubQeodLJd9vkPQaxnC7XnV1Ztert2Lv9hxCUKUGW.rdf --reference-id CFC-18 --from local --yes
sleep 6
regen tx ecocredit create-project C02 "US-PA" regen:13toVgd55rcm3R1ptRfA8Tqa3y12VhwapbuHt645b3zFnjEDNUPyz2E.rdf --reference-id CFC-9 --from local --yes
sleep 6
regen tx ecocredit create-project C02 "US-WA 98029" regen:13toVhpRRova7M4o54S9dq51sVFvnJCxKT79UMPopSQzReP2PuxNdAP.rdf --reference-id CFC-15 --from local --yes
sleep 6
regen tx ecocredit create-project C02 "US-VA 23223" regen:13toVgRKSPwrP6Z7rx9sXXo51XYqDewrabDjaqoXQMudXuRYJqdEHxp.rdf --reference-id CFC-006 --from local --yes
sleep 6
regen tx ecocredit create-project C02 "US-TN 37409" regen:13toVh8FBw5G7FNPRkFuBM3GNXDB5MAAPBbeBdYQ5KuRodH7XBTgSak.rdf --reference-id CFC-012 --from local --yes
sleep 6
regen tx ecocredit create-project C03 "ID" regen:13toVgJE2eUkVhmnohXpzKvvWiapcPmBsaY8hyMBHLDeGJRcksSXe9N.rdf --reference-id VCS-674 --from local --yes
sleep 6
regen tx ecocredit create-project C03 "CO" regen:13toVhFcZXHD1rmZeza4iC8g6ZLdV1hdtczEyHBWYFqVjxV1BMXWQkb.rdf --reference-id VCS-1566 --from local --yes
sleep 6
regen tx ecocredit create-project C03 "KH" regen:13toVgNuHj5Z7VobRehvrVhnGZdRUeEww9Tcic9zxFBkzkKzrACNLp8.rdf --reference-id VCS-1650 --from local --yes
sleep 6
regen tx ecocredit create-project C03 "KE" regen:13toVhNhUt21HvNWqR1gSSmeuiewvuSwx5z1zvs6aKL2owKF7NAP1Du.rdf --reference-id VCS-612 --from local --yes
sleep 6
regen tx ecocredit create-project C03 "BR" regen:13toVgerWTuzKZAW3a4DokEjYSuxhzv3mG9k2eq3dsws7U1GLFx6HnW.rdf --reference-id VCS-875 --from local --yes
sleep 6
regen tx ecocredit create-project C03 "CD" regen:13toVgAY2ZQv6dAxqBSfXBnBKxpSaRfnu9LkL25vqqXzLSrF9pRJD8s.rdf --reference-id VCS-934 --from local --yes
sleep 6
regen tx ecocredit create-project C03 "BR" regen:13toVhKaTEK5CzzQHsMKWqTua7Rmc7AUzo8stVfJTE3kCy5VCMAsvxf.rdf --reference-id VCS-981 --from local --yes
sleep 6
regen tx ecocredit create-project C03 "CN" regen:13toVgEhxth8bvyVnpCqn5QjV7PapbhMpSz21jjP2yUwGN53LTKd4GL.rdf --reference-id VCS-1529 --from local --yes
sleep 6
regen tx ecocredit create-project C03 "CN" regen:13toVhC7QXTsA4NPUPMk8nfiSse9HpfnkqimfZ9o9bL4fgWsnnYuPeN.rdf --reference-id VCS-1577 --from local --yes
sleep 6
regen tx ecocredit create-project C03 "CN" regen:13toVg2h9es7WEBLQJGrpCYgLKNFFfZXn9Nh6qQA71595pGTXrrRNEM.rdf --reference-id VCS-1542 --from local --yes
sleep 6
regen tx ecocredit create-project C03 "CN" regen:13toVgQAoXqnrWVVn9s1HEFcaHXzZDdvPSPuF4eN6Nv7AHn6DXudSQF.rdf --reference-id VCS-1162 --from local --yes
sleep 6
regen tx ecocredit create-project C03 "CG" regen:13toVhrafJcnz74vhsQoCwThKsnEoF12tNkUGhR6dqb9L77QoorUmhV.rdf --reference-id VCS-1052 --from local --yes
sleep 6

# create batches using latest state from mainnet
mkdir -p tmp
echo '{
  "project_id": "C01-001",
  "issuer": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
  "issuance": [
    {
      "recipient": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
      "tradable_amount": "100"
    }
  ],
  "metadata": "regen:13toVg38ZRvFxPA2TBNnxGhabgogpJnv4LDm7YPgSuzuETiXz8GbnTF.rdf",
  "start_date": "2015-01-01T00:00:00Z",
  "end_date": "2015-12-31T00:00:00Z"
}' > tmp/C01-001-001.json
regen tx ecocredit create-batch tmp/C01-001-001.json --from local --yes
sleep 6
echo '{
  "project_id": "C01-001",
  "issuer": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
  "issuance": [
    {
      "recipient": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
      "tradable_amount": "100"
    }
  ],
  "metadata": "regen:13toVhTFtGtXxoHw7yy3QQVDGEpSQoVy4VARhtTWeuNQa5V25WUhagq.rdf",
  "start_date": "2015-01-01T00:00:00Z",
  "end_date": "2015-12-31T00:00:00Z"
}' > tmp/C01-001-002.json
regen tx ecocredit create-batch tmp/C01-001-002.json --from local --yes
sleep 6
echo '{
  "project_id": "C01-001",
  "issuer": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
  "issuance": [
    {
      "recipient": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
      "tradable_amount": "100"
    }
  ],
  "metadata": "regen:13toVghYySmmX9gm76MuwiPCC9AJy6Psb7wj6uj9JiBk4NvACGkpJDw.rdf",
  "start_date": "2015-01-01T00:00:00Z",
  "end_date": "2015-12-31T00:00:00Z"
}' > tmp/C01-001-003.json
regen tx ecocredit create-batch tmp/C01-001-003.json --from local --yes
sleep 6
echo '{
  "project_id": "C01-001",
  "issuer": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
  "issuance": [
    {
      "recipient": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
      "tradable_amount": "100"
    }
  ],
  "metadata": "regen:13toVgGhCxGuNrqKKugLY9thKAdLTgXHGxhbVutz2QLgtFmdZzPAKUB.rdf",
  "start_date": "2015-01-01T00:00:00Z",
  "end_date": "2015-12-31T00:00:00Z"
}' > tmp/C01-001-004.json
regen tx ecocredit create-batch tmp/C01-001-004.json --from local --yes
sleep 6
echo '{
  "project_id": "C01-001",
  "issuer": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
  "issuance": [
    {
      "recipient": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
      "tradable_amount": "100"
    }
  ],
  "metadata": "regen:13toVhaDUK1CHmqdZfKr6ZdF1L1ekTvUgjbEiGxWYqDWVZ937GUviFr.rdf",
  "start_date": "2015-01-01T00:00:00Z",
  "end_date": "2015-12-31T00:00:00Z"
}' > tmp/C01-001-005.json
regen tx ecocredit create-batch tmp/C01-001-005.json --from local --yes
sleep 6
echo '{
  "project_id": "C01-002",
  "issuer": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
  "issuance": [
    {
      "recipient": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
      "tradable_amount": "100"
    }
  ],
  "metadata": "regen:13toVgu5VbjKdfDKuwPfUoMeo2isi1ApbsCsaTCoyNknKnN9FE6j1hW.rdf",
  "start_date": "2019-01-01T00:00:00Z",
  "end_date": "2019-12-31T00:00:00Z"
}' > tmp/C01-002-001.json
regen tx ecocredit create-batch tmp/C01-002-001.json --from local --yes
sleep 6
echo '{
  "project_id": "C01-002",
  "issuer": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
  "issuance": [
    {
      "recipient": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
      "tradable_amount": "100"
    }
  ],
  "metadata": "regen:13toVgxDAxBev51DadD1he6gdkF6UPAoe25Y2xsSn3uDpzmHG3qGqRh.rdf",
  "start_date": "2019-01-01T00:00:00Z",
  "end_date": "2019-12-31T00:00:00Z"
}' > tmp/C01-002-002.json
regen tx ecocredit create-batch tmp/C01-002-002.json --from local --yes
sleep 6
echo '{
  "project_id": "C01-002",
  "issuer": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
  "issuance": [
    {
      "recipient": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
      "tradable_amount": "100"
    }
  ],
  "metadata": "regen:13toVgsTujvEeCS4hG9MXZii8eF9LBkrgzaw8mh2q54KfFtGFtH5DLi.rdf",
  "start_date": "2019-01-01T00:00:00Z",
  "end_date": "2019-12-31T00:00:00Z"
}' > tmp/C01-002-003.json
regen tx ecocredit create-batch tmp/C01-002-003.json --from local --yes
sleep 6
echo '{
  "project_id": "C01-002",
  "issuer": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
  "issuance": [
    {
      "recipient": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
      "tradable_amount": "100"
    }
  ],
  "metadata": "regen:13toVhKuR8NndSGZdciYTtCJf11hjYGwNvsWdjSPBmXNAqk8oL7u7XW.rdf",
  "start_date": "2019-01-01T16:33:40Z",
  "end_date": "2019-12-31T16:33:47Z"
}' > tmp/C01-002-004.json
regen tx ecocredit create-batch tmp/C01-002-004.json --from local --yes
sleep 6
echo '{
  "project_id": "C01-003",
  "issuer": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
  "issuance": [
    {
      "recipient": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
      "tradable_amount": "100"
    }
  ],
  "metadata": "regen:13toVhMT8c7hFZePMqa8raLBgCuLFo4MWbJ7QJRheFRC5dfPcmFZ4hk.rdf",
  "start_date": "2015-07-01T15:31:54Z",
  "end_date": "2016-06-30T15:32:23Z"
}' > tmp/C01-003-001.json
regen tx ecocredit create-batch tmp/C01-003-001.json --from local --yes
sleep 6
echo '{
  "project_id": "C02-001",
  "issuer": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
  "issuance": [
    {
      "recipient": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
      "tradable_amount": "100"
    }
  ],
  "metadata": "regen:13toVgpAwAm6fzYUUkD8UmioCYCP3GMbA3pdNkTM4wKeWc5UxmmCZW8.rdf",
  "start_date": "2018-01-01T00:00:00Z",
  "end_date": "2018-12-31T00:00:00Z"
}' > tmp/C02-001-001.json
regen tx ecocredit create-batch tmp/C02-001-001.json --from local --yes
sleep 6
echo '{
  "project_id": "C02-003",
  "issuer": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
  "issuance": [
    {
      "recipient": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
      "tradable_amount": "100"
    }
  ],
  "metadata": "regen:13toVh5g1AhGAWcTQCBXra1YfD2XJUbH35dvSLuEPAR8mQHJDY5ovVe.rdf",
  "start_date": "2020-06-30T23:22:15Z",
  "end_date": "2022-06-29T23:26:38Z"
}' > tmp/C02-003-001.json
regen tx ecocredit create-batch tmp/C02-003-001.json --from local --yes
sleep 6
echo '{
  "project_id": "C02-002",
  "issuer": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
  "issuance": [
    {
      "recipient": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
      "tradable_amount": "100"
    }
  ],
  "metadata": "regen:13toVhAukPXsjX5gMTADfUQzJQBjehJJoPwSavuU6GjyH5DtxZ5oVYS.rdf",
  "start_date": "2021-10-12T00:00:00Z",
  "end_date": "2024-10-13T00:00:00Z"
}' > tmp/C02-002-001.json
regen tx ecocredit create-batch tmp/C02-002-001.json --from local --yes
sleep 6
echo '{
  "project_id": "C02-004",
  "issuer": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
  "issuance": [
    {
      "recipient": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
      "tradable_amount": "100"
    }
  ],
  "metadata": "regen:13toVh1EoPoJJs1VSvmeQB3HHpXDgFBA19KqiP1tg4NByjWsFLJdjuq.rdf",
  "start_date": "2021-01-02T04:16:33Z",
  "end_date": "2021-12-07T04:18:39Z"
}' > tmp/C02-004-001.json
regen tx ecocredit create-batch tmp/C02-004-001.json --from local --yes
sleep 6
echo '{
  "project_id": "C01-002",
  "issuer": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
  "issuance": [
    {
      "recipient": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
      "tradable_amount": "100"
    }
  ],
  "metadata": "regen:13toVgwjqzxx3b9cRiRXBxrsUQB6D1WC4Kk8zZuXUfwnZ8WYtxRy4r5.rdf",
  "start_date": "2019-01-01T15:21:15Z",
  "end_date": "2019-12-31T15:21:25Z"
}' > tmp/C01-002-005.json
regen tx ecocredit create-batch tmp/C01-002-005.json --from local --yes
sleep 6
echo '{
  "project_id": "C01-001",
  "issuer": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
  "issuance": [
    {
      "recipient": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
      "tradable_amount": "100"
    }
  ],
  "metadata": "regen:13toVhaPG4MzeWcmoriPhQ5jRGx6ohhdzBPREoarrdqTRVCP8Xj7scM.rdf",
  "start_date": "2015-01-01T15:32:50Z",
  "end_date": "2015-12-31T15:32:58Z"
}' > tmp/C01-001-006.json
regen tx ecocredit create-batch tmp/C01-001-006.json --from local --yes
sleep 6
echo '{
  "project_id": "C01-002",
  "issuer": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
  "issuance": [
    {
      "recipient": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
      "tradable_amount": "100"
    }
  ],
  "metadata": "regen:13toVh3NyL4uDzLFcrf6rUFMQnV8af87tBdSzh1Dvsc8zgEx193Y7hr.rdf",
  "start_date": "2019-01-01T15:36:47Z",
  "end_date": "2019-12-31T15:37:03Z"
}' > tmp/C01-002-006.json
regen tx ecocredit create-batch tmp/C01-002-006.json --from local --yes
sleep 6
echo '{
  "project_id": "C03-001",
  "issuer": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
  "issuance": [
    {
      "recipient": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
      "tradable_amount": "100"
    }
  ],
  "metadata": "regen:13toVhaeKYNeRJtbzhBu5CXdgpC7tCHPUWGeEuc8RR731fLyXa9te1E.rdf",
  "start_date": "2014-07-01T00:00:00Z",
  "end_date": "2014-12-31T00:00:00Z"
}' > tmp/C03-001-001.json
regen tx ecocredit create-batch tmp/C03-001-001.json --from local --yes
sleep 6
echo '{
  "project_id": "C03-002",
  "issuer": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
  "issuance": [
    {
      "recipient": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
      "tradable_amount": "100"
    }
  ],
  "metadata": "regen:13toVhKjzKc97mFcCufJMaXPhKMEHaoKRsVEwewLr5Xut7YBNhivxrX.rdf",
  "start_date": "2019-01-01T00:00:00Z",
  "end_date": "2019-12-31T00:00:00Z"
}' > tmp/C03-002-001.json
regen tx ecocredit create-batch tmp/C03-002-001.json --from local --yes
sleep 6
echo '{
  "project_id": "C03-003",
  "issuer": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
  "issuance": [
    {
      "recipient": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
      "tradable_amount": "100"
    }
  ],
  "metadata": "regen:13toVgB7VGTEKNWn97qHBumx2zqZmtMwCBaJshYHFevVfRuW4SWGX5M.rdf",
  "start_date": "2015-01-01T00:00:00Z",
  "end_date": "2015-12-31T00:00:00Z"
}' > tmp/C03-003-001.json
regen tx ecocredit create-batch tmp/C03-003-001.json --from local --yes
sleep 6
echo '{
  "project_id": "C03-004",
  "issuer": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
  "issuance": [
    {
      "recipient": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
      "tradable_amount": "100"
    }
  ],
  "metadata": "regen:13toVh6p9tbULyXtPYTZX9DoA1g6iSasYbWBuK7UKDiffZYGmrANbmh.rdf",
  "start_date": "2019-01-01T00:00:00Z",
  "end_date": "2019-12-31T00:00:00Z"
}' > tmp/C03-004-001.json
regen tx ecocredit create-batch tmp/C03-004-001.json --from local --yes
sleep 6
echo '{
  "project_id": "C03-005",
  "issuer": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
  "issuance": [
    {
      "recipient": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
      "tradable_amount": "100"
    }
  ],
  "metadata": "regen:13toVfxdiCS6h8R6NDHn4LtuQRXG8c3D6Vw63czwiYris8KFYJvvg2c.rdf",
  "start_date": "2016-01-01T00:00:00Z",
  "end_date": "2016-12-31T00:00:00Z"
}' > tmp/C03-005-001.json
regen tx ecocredit create-batch tmp/C03-005-001.json --from local --yes
sleep 6
echo '{
  "project_id": "C03-006",
  "issuer": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
  "issuance": [
    {
      "recipient": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
      "tradable_amount": "100"
    }
  ],
  "metadata": "regen:13toVg7Xt9EvR9pqmtTT1awnNSasZJejoRXXKUbCTCE9VLd4nBVsYWH.rdf",
  "start_date": "2015-01-01T00:00:00Z",
  "end_date": "2015-12-31T00:00:00Z"
}' > tmp/C03-006-001.json
regen tx ecocredit create-batch tmp/C03-006-001.json --from local --yes
sleep 6
echo '{
  "project_id": "C03-007",
  "issuer": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
  "issuance": [
    {
      "recipient": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
      "tradable_amount": "100"
    }
  ],
  "metadata": "regen:13toVg41if27HxHNBZhf5kbUP3kN4DX9LNJPDXzknN9RpK5yLWNm3h5.rdf",
  "start_date": "2017-01-01T00:00:00Z",
  "end_date": "2017-12-31T00:00:00Z"
}' > tmp/C03-007-001.json
regen tx ecocredit create-batch tmp/C03-007-001.json --from local --yes
sleep 6
echo '{
  "project_id": "C03-008",
  "issuer": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
  "issuance": [
    {
      "recipient": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
      "tradable_amount": "100"
    }
  ],
  "metadata": "regen:13toVg7Z2YrvMRRoCxtScKAXbNEBYpVELsnASYymUU78LvxW1nSzFu6.rdf",
  "start_date": "2012-01-01T00:00:00Z",
  "end_date": "2012-12-31T00:00:00Z"
}' > tmp/C03-008-001.json
regen tx ecocredit create-batch tmp/C03-008-001.json --from local --yes
sleep 6
echo '{
  "project_id": "C03-009",
  "issuer": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
  "issuance": [
    {
      "recipient": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
      "tradable_amount": "100"
    }
  ],
  "metadata": "regen:13toVhiYkr78peQaKvrjoP2yVa3z3qpm2yRgxDCnMYuLLrVtyiPEneS.rdf",
  "start_date": "2015-01-01T00:00:00Z",
  "end_date": "2015-12-31T00:00:00Z"
}' > tmp/C03-009-001.json
regen tx ecocredit create-batch tmp/C03-009-001.json --from local --yes
sleep 6
echo '{
  "project_id": "C03-010",
  "issuer": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
  "issuance": [
    {
      "recipient": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
      "tradable_amount": "100"
    }
  ],
  "metadata": "regen:13toVgaYVotRebWVEM4TjfbFng78ASWp7GYsaTcKgBrE12HrLRk2B6P.rdf",
  "start_date": "2015-01-01T00:00:00Z",
  "end_date": "2015-12-31T00:00:00Z"
}' > tmp/C03-010-001.json
regen tx ecocredit create-batch tmp/C03-010-001.json --from local --yes
sleep 6
echo '{
  "project_id": "C03-005",
  "issuer": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
  "issuance": [
    {
      "recipient": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
      "tradable_amount": "100"
    }
  ],
  "metadata": "regen:13toVgHitVB5oq2yJ8d4Goz5uhTDpXceco1eVFuAzzP2p9a1h5wQo3b.rdf",
  "start_date": "2015-01-01T00:00:00Z",
  "end_date": "2015-12-31T00:00:00Z"
}' > tmp/C03-005-001.json
regen tx ecocredit create-batch tmp/C03-005-001.json --from local --yes
sleep 6
echo '{
  "project_id": "C03-010",
  "issuer": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
  "issuance": [
    {
      "recipient": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
      "tradable_amount": "100"
    }
  ],
  "metadata": "regen:13toVh9WtiTnPdTHfHZtcPnAs5p15116mpt3NkKEnryvF1PBmMMGcSd.rdf",
  "start_date": "2014-01-01T00:00:00Z",
  "end_date": "2014-12-31T00:00:00Z"
}' > tmp/C03-010-001.json
regen tx ecocredit create-batch tmp/C03-010-001.json --from local --yes
sleep 6
echo '{
  "project_id": "C03-011",
  "issuer": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
  "issuance": [
    {
      "recipient": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
      "tradable_amount": "100"
    }
  ],
  "metadata": "regen:13toVh2XQTWXoRSyBy88L6NDDPJzkhutzqM2GWHaYGxkE5PiR92qNim.rdf",
  "start_date": "2015-01-01T00:00:00Z",
  "end_date": "2015-12-31T00:00:00Z"
}' > tmp/C03-011-001.json
regen tx ecocredit create-batch tmp/C03-011-001.json --from local --yes
sleep 6
echo '{
  "project_id": "C03-012",
  "issuer": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
  "issuance": [
    {
      "recipient": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
      "tradable_amount": "100"
    }
  ],
  "metadata": "regen:13toVgeGj4Zh2MvT2MwaKyTqpvSQX6kvNYAqKB251icz1AEKbC8kxk2.rdf",
  "start_date": "2012-01-01T00:00:00Z",
  "end_date": "2012-12-31T00:00:00Z"
}' > tmp/C03-012-001.json
regen tx ecocredit create-batch tmp/C03-012-001.json --from local --yes
sleep 6
echo '{
  "project_id": "C03-005",
  "issuer": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
  "issuance": [
    {
      "recipient": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
      "tradable_amount": "100"
    }
  ],
  "metadata": "regen:13toVh2aMmZNJXKFJEfgvzBBVjxA6jcRZw2XMyP7mhLZTPids2HwG4p.rdf",
  "start_date": "2013-01-01T00:00:00Z",
  "end_date": "2013-12-31T00:00:00Z"
}' > tmp/C03-005-003.json
regen tx ecocredit create-batch tmp/C03-005-003.json --from local --yes
sleep 6
echo '{
  "project_id": "C02-005",
  "issuer": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
  "issuance": [
    {
      "recipient": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
      "tradable_amount": "100"
    }
  ],
  "metadata": "regen:13toVgfzANbkMLNjs5CrRtfmWZj2fXKXgRahkSp1onoTrrM1MSaaGJK.rdf",
  "start_date": "2019-11-06T22:51:55Z",
  "end_date": "2020-02-25T22:51:58Z"
}' > tmp/C02-005-001.json
regen tx ecocredit create-batch tmp/C02-005-001.json --from local --yes
sleep 6
echo '{
  "project_id": "C02-006",
  "issuer": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
  "issuance": [
    {
      "recipient": "regen1l2pwmzk96ftmmt5egpjulyqtneygmmzndf7csk",
      "tradable_amount": "100"
    }
  ],
  "metadata": "regen:13toVfwkfM96d5tRd7SDg27ueCtURq43o1Gxe1yXVSDsSVpFCmLGoVk.rdf",
  "start_date": "2021-02-16T07:00:00Z",
  "end_date": "2022-02-15T07:00:00Z"
}' > tmp/C02-006-001.json
regen tx ecocredit create-batch tmp/C02-006-001.json --from local --yes
sleep 6

# create baskets using latest state from mainnet
regen tx ecocredit create-basket NCT --credit-type-abbrev C --allowed-classes C03 --basket-fee 20000000uregen --description "Nature Carbon Ton (NCT) is a carbon token standard backed 1:1 by carbon credits issued by Verra, a global leader in the voluntary carbon market. NCT credits on Regen Network have been tokenized by Toucan.earth. More info here: https://regen.network/nct" --minimum-start-date 2012-01-01 --from local --yes
sleep 6
